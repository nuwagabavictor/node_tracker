"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordFactorSchema = exports.twoFactorSchema = void 0;
exports.isRoleType = isRoleType;
exports.registerHandler = registerHandler;
exports.loginHandler = loginHandler;
exports.changePassword = changePassword;
exports.refreshHandler = refreshHandler;
exports.twoFactorHandler = twoFactorHandler;
exports.requestPasswordOtp = requestPasswordOtp;
exports.requestPasswordChange = requestPasswordChange;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../Entities/User");
const ApiError_1 = require("../Helpers/ApiError");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const TwoFactor_1 = require("../Entities/TwoFactor");
const enum_1 = require("../enums/enum");
const PasswordToken_1 = require("../Entities/PasswordToken");
const BusinessEventNotifierService_1 = require("../events/BusinessEventNotifierService");
const UserCreatedBusinessEvent_1 = require("../events/initiators/UserCreatedBusinessEvent");
const TwoFactorBusinessEvent_1 = require("../events/initiators/TwoFactorBusinessEvent");
const PasswordChangeBusinessEvent_1 = require("../events/initiators/PasswordChangeBusinessEvent");
const PasswordOtpBusinessEvent_1 = require("../events/initiators/PasswordOtpBusinessEvent");
const UserLoggedInBusinessEvent_1 = require("../events/initiators/UserLoggedInBusinessEvent");
// Validation schemas
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    role: zod_1.z.string(),
    phone: zod_1.z.string(),
    password: zod_1.z.string().min(8)
});
function isRoleType(role) {
    return enum_1.Roles.includes(role);
}
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
const changePasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string().min(8)
});
const changePasswordSelf = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.twoFactorSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6)
});
exports.passwordFactorSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6),
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string().min(8)
});
// ============================
// REGISTER
// ============================
async function registerHandler(req, res, next) {
    try {
        const body = registerSchema.parse(req.body);
        if (!isRoleType(body.role)) {
            throw new Error(`Invalid role: ${body.role}}`);
        }
        const existing = await User_1.User.findOne({ where: { email: body.email } });
        if (existing) {
            throw ApiError_1.ApiError.conflict("Email already in use");
        }
        const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
        const user = await User_1.User.fromJson({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            role: body.role,
            phone: body.phone,
        });
        await user.save();
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new UserCreatedBusinessEvent_1.UserCreatedBusinessEvent(user));
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        next(error);
    }
}
// ============================
// LOGIN
// ============================
async function loginHandler(req, res, next) {
    try {
        const body = loginSchema.parse(req.body);
        const user = await User_1.User.findOne({ where: { email: body.email },
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
                phone: true,
                accountNonLocked: true
            }
        });
        if (!user) {
            throw ApiError_1.ApiError.unauthorized("Invalid credentials");
        }
        if (!user.canLogin()) {
            throw ApiError_1.ApiError.forbidden("Account is disabled");
        }
        const passwordMatch = await bcrypt_1.default.compare(body.password, user.getPassword());
        if (!passwordMatch) {
            user.recordFailedLogin(5, 3);
            await user.save();
            throw ApiError_1.ApiError.unauthorized("Invalid credentials");
        }
        if (user.hasTwoFactor()) {
            await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new TwoFactorBusinessEvent_1.TwoFactorBusinessEvent(user));
            return res.status(200).json({ "message": "Two-factor authentication required, Otp sent" });
        }
        user.recordSuccessfulLogin();
        await user.save();
        const token = (0, AuthMiddleware_1.signAccessToken)({ id: user.getId(), email: user.getEmail(), role: user.getRole() });
        const refreshToken = await (0, AuthMiddleware_1.generateToken)(user);
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new UserLoggedInBusinessEvent_1.UserLoggedInBusinessEvent(user));
        return res.status(200).json({
            message: "Login successful",
            accessToken: token,
            refreshToken: refreshToken,
            user: {
                id: user.getId(),
                username: user.getUsername(),
                email: user.getEmail(),
                role: user.getRole(),
                isAuthenticated: true
            }
        });
    }
    catch (error) {
        next(error);
    }
}
async function changePassword(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            throw ApiError_1.ApiError.badRequest("Invalid user id");
        }
        const body = changePasswordSchema.parse(req.body);
        const user = await User_1.User.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }
        if (body.password !== body.confirmPassword) {
            throw new ApiError_1.ApiError(400, "Passwords do not match");
        }
        const encoded = await bcrypt_1.default.hash(body.password, 10);
        user.changePassword(encoded);
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new PasswordChangeBusinessEvent_1.PasswordChangeBusinessEvent(user));
        await user.save();
        return res.status(200).json({
            message: "Password changed successfully"
        });
    }
    catch (e) {
        next(e);
    }
}
async function refreshHandler(req, res, next) {
    try {
        const { token } = req.body;
        if (!token) {
            throw new Error("Refresh token is required");
        }
        const tokens = await (0, AuthMiddleware_1.refreshAccessToken)(token);
        return res.status(200).json(tokens);
    }
    catch (error) {
        next(error);
    }
}
async function twoFactorHandler(req, res, next) {
    try {
        const body = exports.twoFactorSchema.parse(req.body);
        const user = await User_1.User.findOne({
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
            throw ApiError_1.ApiError.unauthorized("Invalid email or OTP");
        }
        const factor = await TwoFactor_1.TwoFactor.findOne({
            where: {
                userId: user.id,
                used: false
            },
            order: {
                createdAt: "DESC"
            }
        });
        if (!factor) {
            throw ApiError_1.ApiError.unauthorized("No active OTP found");
        }
        if (!factor.isValid()) {
            throw ApiError_1.ApiError.unauthorized("OTP is invalid");
        }
        const matches = await bcrypt_1.default.compare(body.otp, factor.otpHash);
        if (!matches) {
            throw ApiError_1.ApiError.unauthorized("Invalid email or OTP");
        }
        // prevent replay attacks
        factor.markUsed();
        await factor.save();
        const accessToken = (0, AuthMiddleware_1.signAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role
        });
        const refreshToken = await (0, AuthMiddleware_1.generateToken)(user);
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
    }
    catch (error) {
        next(error);
    }
}
async function requestPasswordOtp(req, res, next) {
    try {
        const body = changePasswordSelf.parse(req.body);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt_1.default.hash(otp, 10);
        const existing = await User_1.User.findOne({
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
        if (!existing) {
            throw ApiError_1.ApiError.unauthorized("Invalid credentials");
        }
        const existingToken = await PasswordToken_1.PasswordToken.findOne({
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
        const token = PasswordToken_1.PasswordToken.createPasswordToken({
            user: existing,
            tokenHash: otpHash,
            expiryMinutes: 5
        });
        await token.save();
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new PasswordOtpBusinessEvent_1.PasswordOtpBusinessEvent({
            otp: otp,
            user: existing,
            expiryMinutes: 5
        }));
        return res.status(200).json({
            message: "OTP sent to your email"
        });
    }
    catch (e) {
        next(e);
    }
}
async function requestPasswordChange(req, res, next) {
    try {
        const body = exports.passwordFactorSchema.parse(req.body);
        const user = await User_1.User.findOne({
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
            throw ApiError_1.ApiError.unauthorized("Invalid credentials");
        }
        const token = await PasswordToken_1.PasswordToken.findOne({
            where: {
                userId: user.id,
                revoked: false
            },
            order: {
                createdAt: "DESC"
            }
        });
        if (!token) {
            throw ApiError_1.ApiError.badRequest("No otp found");
        }
        if (!token.isValid()) {
            throw ApiError_1.ApiError.badRequest("Invalid otp");
        }
        const compare = await bcrypt_1.default.compare(body.otp, token.otpHash);
        if (!compare) {
            throw ApiError_1.ApiError.badRequest("Invalid otp");
        }
        if (body.password !== body.confirmPassword) {
            throw ApiError_1.ApiError.badRequest("Passwords do not match");
        }
        token.markUsed();
        await token.save();
        const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
        user.changePassword(hashedPassword);
        await user.save();
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new PasswordChangeBusinessEvent_1.PasswordChangeBusinessEvent(user));
        return res.status(200).json({
            message: "Password changed"
        });
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=UserController.js.map