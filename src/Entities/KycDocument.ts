import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { KycProfile } from "./KycProfile";
import { Document } from "./Document";
import {
    KycDocumentStatus,
    KycDocumentStatuses,
    KycDocumentType,
    KycDocumentTypes
} from "../enums/enum";

@Entity("m_kyc_document")
@Index(["profile", "documentType"], { unique: true })
export class KycDocument extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => KycProfile, (profile) => profile.documents, {onDelete: "CASCADE"})
    @JoinColumn({ name: "kyc_profile_id" })
    profile!: KycProfile;

    @Column({name: "document_type", type: "enum", enum: KycDocumentTypes})
    documentType!: KycDocumentType;

    @ManyToOne(() => Document, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({ name: "document_id" })
    document: Document | null = null;

    @Column({type: "enum", enum: KycDocumentStatuses, default: "PENDING"})
    status!: KycDocumentStatus;

    @Column({name: "rejection_reason", type: "text", nullable: true})
    rejectionReason: string | null = null;

    @Column({name: "reviewed_at", type: "datetime", nullable: true})
    reviewedAt: Date | null = null;

    @Column({name: "reviewed_by", type: "bigint", nullable: true})
    reviewedBy: number | null = null;

    @Column({name: "submitted_by", type: "bigint", nullable: true})
    submittedBy: number | null = null;

    @Column({name: "approved_by", type: "bigint", nullable: true})
    approvedBy: number | null = null;

    @Column({name: "approved_at", type: "datetime", nullable: true})
    approvedAt: Date | null = null;

    @Column({name: "rejected_by", type: "bigint", nullable: true})
    rejectedBy: number | null = null;

    @Column({name: "rejected_at", type: "datetime", nullable: true})
    rejectedAt: Date | null = null;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    /**
     * Create a new checklist/upload row
     */
    static createKycDocument(
        profile: KycProfile,
        documentType: KycDocumentType,
        document?: Document
    ): KycDocument {

        const kycDocument = new KycDocument();

        kycDocument.profile = profile;
        kycDocument.documentType = documentType;
        kycDocument.document = document ?? null;
        kycDocument.status = "PENDING";

        return kycDocument;
    }

    /**
     * Attach or replace an uploaded file
     */
    attachDocument(document: Document, submittedBy?: number): void {

        this.document = document;
        this.status = "PENDING";

        this.rejectionReason = null;

        this.reviewedBy = null;
        this.reviewedAt = null;

        this.approvedBy = null;
        this.approvedAt = null;

        this.rejectedBy = null;
        this.rejectedAt = null;

        if (submittedBy !== undefined) {
            this.submittedBy = submittedBy;
        }
    }

    /**
     * Approve this document
     */
    approve(reviewerId: number): void {

        this.status = "APPROVED";

        this.reviewedBy = reviewerId;
        this.reviewedAt = new Date();

        this.approvedBy = reviewerId;
        this.approvedAt = new Date();

        this.rejectedBy = null;
        this.rejectedAt = null;
        this.rejectionReason = null;
    }

    /**
     * Reject this document
     */
    reject(reviewerId: number, reason: string): void {

        if (!reason.trim()) {
            throw new Error("Rejection reason is required");
        }

        this.status = "REJECTED";

        this.reviewedBy = reviewerId;
        this.reviewedAt = new Date();

        this.rejectedBy = reviewerId;
        this.rejectedAt = new Date();

        this.rejectionReason = reason;

        this.approvedBy = null;
        this.approvedAt = null;
    }

    /**
     * Reset back to pending review
     */
    markPending(): void {

        this.status = "PENDING";

        this.reviewedBy = null;
        this.reviewedAt = null;

        this.approvedBy = null;
        this.approvedAt = null;

        this.rejectedBy = null;
        this.rejectedAt = null;

        this.rejectionReason = null;
    }

    /**
     * Convenience helpers
     */
    isApproved(): boolean {
        return this.status === "APPROVED";
    }

    isRejected(): boolean {
        return this.status === "REJECTED";
    }

    isPending(): boolean {
        return this.status === "PENDING";
    }

    hasFile(): boolean {
        return this.document !== null;
    }
}