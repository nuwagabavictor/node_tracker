import {NextFunction, Request, Response} from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import {User} from "../Entities/User";
import {ApiError} from "../Helpers/ApiError";
import {generateToken, refreshAccessToken, signAccessToken} from "../Middleware/AuthMiddleware";
import {TwoFactor} from "../Entities/TwoFactor";
import {Roles, UserRole} from "../enums/enum";
import {PasswordToken} from "../Entities/PasswordToken";
import {businessEventNotifier} from "../events/BusinessEventNotifierService";
import {UserCreatedBusinessEvent} from "../events/initiators/UserCreatedBusinessEvent";
import {TwoFactorBusinessEvent} from "../events/initiators/TwoFactorBusinessEvent";
import {PasswordChangeBusinessEvent} from "../events/initiators/PasswordChangeBusinessEvent";
import {PasswordOtpBusinessEvent} from "../events/initiators/PasswordOtpBusinessEvent";
import {UserLoggedInBusinessEvent} from "../events/initiators/UserLoggedInBusinessEvent";
import {ChangeProfileBusinessEvent} from "../events/initiators/ChangeProfileBusinessEvent";
import {ConfigurationService} from "../shared/ConfigurationService";


// Validation schemas

const registerSchema = z.object({

    username: z.string().min(3),

    email: z.string().email(),

    role: z.string(),

    phone: z.string(),

    password: z.string().min(8)

});

const profileSchema = z.object({
    username: z.string().min(3),

    email: z.string().email(),

    phone: z.string(),

})

export function isRoleType(role:string): role is UserRole{
    return (Roles as readonly string[]).includes(role);
}


const loginSchema = z.object({

    email: z.string().email(),

    password: z.string()

});

const changePasswordSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
})

const changePasswordSelf = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const twoFactorSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6)
});

export const passwordFactorSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
});

const configurationService = new ConfigurationService()



// ============================
// REGISTER
// ============================

export async function registerHandler(req: Request, res: Response, next: NextFunction){

    try {

        const body = registerSchema.parse(req.body);

        if (!isRoleType(body.role)){
            throw new Error(`Invalid role: ${body.role}}`)
        }


        const existing = await User.findOne({where:{email: body.email}});


        if(existing){
            throw ApiError.conflict("Email already in use");

        }


        const hashedPassword = await bcrypt.hash(body.password, 10);


        const user = await User.fromJson({
                username: body.username,
                email: body.email,
                password: hashedPassword,
                role: body.role as UserRole,
                phone: body.phone,
            });


        await user.save();

        await configurationService.createDefaults(user);

        await businessEventNotifier.notifyPostBusinessEvent(new UserCreatedBusinessEvent(user))


        return res.status(201).json({
            message:"User registered successfully",

            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }

        });


    }catch(error){

        next(error);

    }

}



// ============================
// LOGIN
// ============================

export async function loginHandler(req: Request, res: Response, next: NextFunction){

    try {

        const body = loginSchema.parse(req.body);

        const user = await User.findOne({where:{email:body.email},
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                role: true,
                enabled: true,
                locked: true,
                deleted: true,
                twoFactorEnabled: true,
                accountNonExpired: true,
                credentialsNonExpired: true,
                failedLoginAttempts: true,
                phone:true,
                accountNonLocked: true
            }
        });



        if(!user){
            throw ApiError.unauthorized("Invalid credentials");
        }

        if(!user.canLogin()){
            throw ApiError.forbidden("Account is disabled");
        }

        const passwordMatch = await bcrypt.compare(body.password, user.getPassword());

        if(!passwordMatch){
            user.recordFailedLogin(5,3);
            await user.save();
            throw ApiError.unauthorized("Invalid credentials");
        }

        if (user.hasTwoFactor()){
            await businessEventNotifier.notifyPostBusinessEvent(new TwoFactorBusinessEvent(user))
            return res.status(200).json({"message": "Two-factor authentication required, Otp sent"})
        }

        user.recordSuccessfulLogin();
        await user.save();

        const token = signAccessToken({id:user.getId(), email:user.getEmail(), role:user.getRole()});

        const refreshToken  = await generateToken(user);

        await businessEventNotifier.notifyPostBusinessEvent(
            new UserLoggedInBusinessEvent(user)
        );

        return res.status(200).json({

            message:"Login successful",

            accessToken:token,
            refreshToken: refreshToken,

            user:{
                id:user.getId(),
                username:user.getUsername(),
                email:user.getEmail(),
                role:user.getRole(),
                isAuthenticated: true
            }

        });



    }catch(error){

        next(error);

    }

}

export async function changePassword(req: Request, res: Response, next: NextFunction){
    try{
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw ApiError.badRequest("Invalid user id");
        }

        const body = changePasswordSchema.parse(req.body);

        const user = await User.findOneBy({ id })

        if (!user){
            throw new Error("User not found");
        }

        if (body.password !== body.confirmPassword){
            throw new ApiError(400, "Passwords do not match")
        }

        const encoded = await bcrypt.hash(body.password, 10);

        user.changePassword(encoded);

        await businessEventNotifier.notifyPostBusinessEvent(new PasswordChangeBusinessEvent(user))

        await user.save();


        return res.status(200).json({
            message:"Password changed successfully"
        })
    }catch (e) {
        next(e);
    }
}

export async function refreshHandler(req: Request, res: Response, next: NextFunction){

    try {

        const { token } = req.body;


        if (!token) {
            throw new Error("Refresh token is required");

        }

        const tokens = await refreshAccessToken(token);

        return res.status(200).json(tokens);


    } catch(error) {

        next(error);

    }
}

export async function twoFactorHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const body = twoFactorSchema.parse(req.body);

        const user = await User.findOne({
            where: { email: body.email },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                enabled: true,
                locked: true,
                deleted: true,
                accountNonExpired: true,
                credentialsNonExpired: true
            }
        });

        if (!user) {
            throw ApiError.unauthorized("Invalid email or OTP");
        }

        const factor = await TwoFactor.findOne({
            where: {
                userId: user.id,
                used: false
            },
            order: {
                createdAt: "DESC"
            }
        });

        if (!factor) {
            throw ApiError.unauthorized("No active OTP found");
        }

        if (!factor.isValid()) {
            throw ApiError.unauthorized("OTP is invalid");
        }

        const matches = await bcrypt.compare(body.otp, factor.otpHash);

        if (!matches) {
            throw ApiError.unauthorized("Invalid email or OTP");
        }

        // prevent replay attacks
        factor.markUsed();
        await factor.save();

        const accessToken = signAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        const refreshToken = await generateToken(user);

        return res.status(200).json({
            message: "Two-factor authentication successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
}

export async function requestPasswordOtp(req: Request, res:Response, next: NextFunction){
    try{
        const body = changePasswordSelf.parse(req.body);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpHash = await bcrypt.hash(otp, 10);

        const existing = await User.findOne({
            where:{email:body.email},
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                enabled: true,
                locked: true,
                deleted: true,
                accountNonExpired: true,
                credentialsNonExpired: true
            }
        });

        if (!existing){
            throw ApiError.unauthorized("Invalid credentials")
        }

        const existingToken = await PasswordToken.findOne({
            where: {
                userId: existing.id,
                revoked: false,
            },
            order: {
                createdAt: "DESC"
            }
        });

        if (existingToken && existingToken.isValid()) {

            const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

            if (existingToken.createdAt > twoMinutesAgo) {
                return res.status(200).json({
                    message: "An OTP has already been sent. Please wait before requesting another."
                });
            }

            // Existing OTP is still valid but resend cooldown has passed.
            existingToken.markUsed();
            await existingToken.save();
        }

        const token = PasswordToken.createPasswordToken({
            user: existing,
            tokenHash: otpHash,
            expiryMinutes: 5
        })

        await token.save();

        await businessEventNotifier.notifyPostBusinessEvent(new PasswordOtpBusinessEvent({
            otp: otp,
            user: existing,
            expiryMinutes: 5
        }))

        return res.status(200).json({
            message: "OTP sent to your email"
        })
    }catch (e) {
        next(e)
    }
}

export async function requestPasswordChange(req: Request, res:Response, next: NextFunction){
    try{
        const body = passwordFactorSchema.parse(req.body);

        const user = await User.findOne({
            where:{email:body.email},
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                enabled: true,
                locked: true,
                deleted: true,
                accountNonExpired: true,
                credentialsNonExpired: true
            }
        });

        if (!user){
            throw ApiError.unauthorized("Invalid credentials")
        }



        const token = await PasswordToken.findOne({
            where: {
                userId: user.id,
                revoked: false
            },
            order: {
                createdAt: "DESC"
            }
        })

        if (!token){
            throw ApiError.badRequest("No otp found");
        }

        if (!token.isValid()){
            throw ApiError.badRequest("Invalid otp");
        }

        const compare = await bcrypt.compare(body.otp, token.otpHash);

        if (!compare){
            throw ApiError.badRequest("Invalid otp");
        }

        if (body.password !== body.confirmPassword){
            throw ApiError.badRequest("Passwords do not match");
        }

        token.markUsed();
        await token.save();

        const hashedPassword = await bcrypt.hash(body.password, 10);

        user.changePassword(hashedPassword);

        await user.save();

        await businessEventNotifier.notifyPostBusinessEvent(new PasswordChangeBusinessEvent(user))

        return res.status(200).json({
            message: "Password changed"
        })

    }catch (e) {
        next(e)
    }
}

export async function changeProfile(req: Request, res:Response, next: NextFunction){
    try {

        const body = profileSchema.parse(req.body);

        const id = Number(req.user?.id);

        const user = await User.findOne({where: {id:id}})

        if (!user){
            throw new Error("User not found")
        }

        const changes = user.changes({email: body.email, phone: body.phone, username: body.username});

        if (Object.keys(changes).length > 0) {
            await user.save();
        }

        await businessEventNotifier.notifyPostBusinessEvent(new ChangeProfileBusinessEvent(user))

        return res.status(200).json({
            message: "Profile Updated",
            userId: user.id,
            changes: changes
        })

    }catch (e) {
        next(e)
    }
}