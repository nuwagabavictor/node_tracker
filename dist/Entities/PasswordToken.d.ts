import { BaseEntity } from "typeorm";
import { User } from "./User";
export declare class PasswordToken extends BaseEntity {
    id: number;
    user: User;
    userId: number;
    otpHash: string;
    revoked: boolean;
    expiresAt: Date;
    createdAt: Date;
    isExpired(): boolean;
    isValid(): boolean;
    markUsed(): void;
    static createPasswordToken(params: {
        user: User;
        tokenHash: string;
        expiryMinutes: number;
    }): PasswordToken;
}
//# sourceMappingURL=PasswordToken.d.ts.map