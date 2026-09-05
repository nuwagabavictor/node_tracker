import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity("two_factor")
export class TwoFactor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255, nullable: false })
    otpHash!: string;

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ name: 'user_id' })
    @Index()
    userId!: number;

    @Column({ type: "datetime" })
    expiresAt!: Date;

    @Column({ default: false })
    used!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    markUsed(): void {
        this.used = true;
    }

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    isValid(): boolean {
        return !this.used && !this.isExpired();
    }

    static createForUser(params: {
        user: User;
        otpHash: string;
        expiryMinutes: number;
    }): TwoFactor {

        const factor = new TwoFactor();
        factor.user = params.user;
        factor.otpHash = params.otpHash;
        factor.expiresAt = new Date(
            Date.now() + params.expiryMinutes * 60 * 1000
        );
        factor.used = false;

        return factor;
    }
}