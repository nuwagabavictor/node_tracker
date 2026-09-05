import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {KycProfileStatus, KycProfileStatuses, KycSubjectType, KycSubjectTypes} from "../enums/enum";
import {KycDocument} from "./KycDocument";

@Entity("m_kyc_profile")
@Index(["subjectType", "subjectId"], { unique: true })
export class KycProfile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "subject_type", type: "enum", enum: KycSubjectTypes })
    subjectType!: KycSubjectType;

    @Column({ name: "subject_id", type: "bigint" })
    subjectId!: number;

    @Column({ type: "enum", enum: KycProfileStatuses, default: "INCOMPLETE" })
    status!: KycProfileStatus;

    @Column({ name: "rejection_reason", type: "text", nullable: true })
    rejectionReason?: string;

    @Column({ name: "reviewed_at", type: "datetime", nullable: true })
    reviewedAt?: Date;

    @Column({ name: "submitted_at", type: "datetime", nullable: true })
    submittedAt?: Date;

    @Column({ name: "reviewed_by", type: "bigint", nullable: true })
    reviewedBy?: number;

    @Column({ name: "expires_at", type: "timestamp", nullable: true })
    expiresAt?: Date;

    @OneToMany(() => KycDocument, (doc) => doc.profile)
    documents!: KycDocument[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    static createKycProfile(subjectType: KycSubjectType, subjectId: number): KycProfile {
        const profile = new KycProfile();
        profile.subjectType = subjectType;
        profile.subjectId = subjectId;
        profile.status = "INCOMPLETE";
        return profile;
    }


}
