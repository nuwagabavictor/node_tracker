import { BaseEntity } from "typeorm";
import { User } from "./User";
export declare class RefreshToken extends BaseEntity {
    id: number;
    user: User;
    tokenHash: string;
    revoked: boolean;
    expiresAt: Date;
    createdAt: Date;
    isExpired(): boolean;
    isValid(): boolean;
    markUsed(): void;
    static createToken(params: {
        user: User;
        tokenHash: string;
        expiryDays: number;
    }): RefreshToken;
}
//# sourceMappingURL=RefreshToken.d.ts.map