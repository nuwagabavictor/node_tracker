import jwt, {Secret, SignOptions} from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env";
import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums/enum";
import { ApiError } from "../Helpers/ApiError";
import { User } from "../Entities/User";
import {RefreshToken} from "../Entities/RefreshToken";
import type { StringValue } from "ms";
import {TwoFactor} from "../Entities/TwoFactor";
import bcrypt from "bcrypt";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: {
                id: number
                role: UserRole
                email: string | null
            }
        }
    }
}

export type AccessTokenPayload = {
    id: number;
    email: string;
    role: UserRole;
};

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: UserRole;
    };
}

const JWT_ALGORITHM: jwt.Algorithm = "HS256";

export function signAccessToken(payload: AccessTokenPayload): string {
    const secret: Secret = env.jwtAccessSecret;

    const options: SignOptions = {
        algorithm: JWT_ALGORITHM,
        expiresIn: env.jwtAccessTtl as StringValue
    };

    return jwt.sign(payload, secret, options);
}

function isJwtPayload(value: unknown): value is AccessTokenPayload {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as any).id === "number" &&
        typeof (value as any).email === "string" &&
        typeof (value as any).role === "string"
    );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
    const decoded = jwt.verify(token, env.jwtAccessSecret, {
        algorithms: [JWT_ALGORITHM],
    });

    if (!isJwtPayload(decoded)) {
        throw new jwt.JsonWebTokenError("Malformed token payload");
    }

    return decoded;
}

export async function generateToken(user:User){

    // random refresh token

    const refreshToken = crypto.randomBytes(64).toString("hex");

    const refresh = RefreshToken.createToken({user: user, tokenHash:refreshToken, expiryDays:30});


    await refresh.save();


    return refresh.tokenHash;

}

export async function refreshAccessToken(refreshToken: string){
    const token = await RefreshToken.findOne({where:{tokenHash:refreshToken}})
    if (!token) throw new Error("Invalid refresh token")
    if (token.isExpired()) throw new Error("Refresh token expired")
    if (!token.isValid()) throw new Error("Refresh token already used")
    token.markUsed()
    await token.save()
    const user = token.user;
    const accessToken = signAccessToken({ id: user.getId(), email: user.getEmail(), role: user.getRole()})

    const newRefreshToken = await generateToken(token.user);

    const responseObj = {
        user:{
            id: user.id,
            email: user.email,
            role: user.role
        },
        accessToken: accessToken,
        refreshToken: newRefreshToken
    }

    return responseObj;
}

export async function generateTwoFactorToken(user: User): Promise<string> {

    // invalidate previous unused tokens
    await TwoFactor.update({ userId: user.id, used: false }, { used: true });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = await bcrypt.hash(otp, 10);

    const factor = TwoFactor.createForUser({
        user,
        otpHash,
        expiryMinutes: 5
    });

    await factor.save();

    return otp;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(ApiError.unauthorized("Authorization header is missing"));
    }

    if (!authorization.startsWith("Bearer ")) {
        return next(ApiError.unauthorized("Authorization header is not in the correct format"));
    }

    const token = authorization.substring(7).trim();

    if (!token) {
        return next(ApiError.unauthorized("Bearer token is empty"));
    }

    let payload: AccessTokenPayload;
    try {
        payload = verifyAccessToken(token);
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return next(ApiError.unauthorized("Token has expired"));
        }
        if (e instanceof jwt.JsonWebTokenError) {
            return next(ApiError.unauthorized("Invalid token"));
        }
        // Unexpected error verifying the token — don't mask it as a 401 silently
        console.error("Unexpected error verifying access token:", e);
        return next(ApiError.unauthorized("Invalid or expired token"));
    }

    try {
        const user = await User.findOne({ where: { id: payload.id } });

        if (!user) {
            return next(ApiError.unauthorized("User not found"));
        }

        if (!user.canLogin()) {
            return next(ApiError.forbidden("Account is disabled or locked"));
        }

        req.user = {
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        };

        next();
    } catch (e) {
        // DB / infra failure — this is a real 500, not an auth failure
        console.error("Error loading user during authentication:", e);
        return next(ApiError.unauthorized("Failed to authenticate request"));
    }
}

export function authorize(...roles: UserRole[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(ApiError.unauthorized());
        }
        if (roles.length > 0 && !roles.includes(req.user.role)) {
            return next(
                ApiError.forbidden(`Role ${req.user.role} is not permitted to perform this action`)
            );
        }
        next();
    };
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
        return next(ApiError.unauthorized('Missing bearer token'))
    }

    try {
        const token = header.slice('Bearer '.length)
        const payload = verifyAccessToken(token)
        req.user = { id: payload.id, email: payload.email, role: payload.role as UserRole }
        next()
    } catch {
        next(ApiError.unauthorized('Invalid or expired token'))
    }
}