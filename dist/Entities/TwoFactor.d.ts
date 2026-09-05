import { BaseEntity } from "typeorm";
import { User } from "./User";
export declare class TwoFactor extends BaseEntity {
    id: number;
    otpHash: string;
    user: User;
    userId: number;
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
    markUsed(): void;
    isExpired(): boolean;
    isValid(): boolean;
    static createForUser(params: {
        user: User;
        otpHash: string;
        expiryMinutes: number;
    }): TwoFactor;
}
//# sourceMappingURL=TwoFactor.d.ts.map