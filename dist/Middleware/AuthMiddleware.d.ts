import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums/enum";
import { User } from "../Entities/User";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: UserRole;
                email: string | null;
            };
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
export declare function signAccessToken(payload: AccessTokenPayload): string;
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export declare function generateToken(user: User): Promise<string>;
export declare function refreshAccessToken(refreshToken: string): Promise<{
    user: {
        id: number;
        email: string;
        role: "ADMIN" | "USER" | "GUEST" | "DRIVER" | "OPERATOR" | "COMPANY" | "SUPER_ADMIN" | "RIDER";
    };
    accessToken: string;
    refreshToken: string;
}>;
export declare function generateTwoFactorToken(user: User): Promise<string>;
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function authorize(...roles: UserRole[]): (req: Request, _res: Response, next: NextFunction) => void;
export declare function authenticate(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=AuthMiddleware.d.ts.map