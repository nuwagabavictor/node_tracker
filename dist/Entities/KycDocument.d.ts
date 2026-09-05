import { BaseEntity } from "typeorm";
import { KycProfile } from "./KycProfile";
import { Document } from "./Document";
import { KycDocumentStatus, KycDocumentType } from "../enums/enum";
export declare class KycDocument extends BaseEntity {
    id: number;
    profile: KycProfile;
    documentType: KycDocumentType;
    document: Document | null;
    status: KycDocumentStatus;
    rejectionReason: string | null;
    reviewedAt: Date | null;
    reviewedBy: number | null;
    submittedBy: number | null;
    approvedBy: number | null;
    approvedAt: Date | null;
    rejectedBy: number | null;
    rejectedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Create a new checklist/upload row
     */
    static createKycDocument(profile: KycProfile, documentType: KycDocumentType, document?: Document): KycDocument;
    /**
     * Attach or replace an uploaded file
     */
    attachDocument(document: Document, submittedBy?: number): void;
    /**
     * Approve this document
     */
    approve(reviewerId: number): void;
    /**
     * Reject this document
     */
    reject(reviewerId: number, reason: string): void;
    /**
     * Reset back to pending review
     */
    markPending(): void;
    /**
     * Convenience helpers
     */
    isApproved(): boolean;
    isRejected(): boolean;
    isPending(): boolean;
    hasFile(): boolean;
}
//# sourceMappingURL=KycDocument.d.ts.map