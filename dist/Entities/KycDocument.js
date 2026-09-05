"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KycDocument_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycDocument = void 0;
const typeorm_1 = require("typeorm");
const KycProfile_1 = require("./KycProfile");
const Document_1 = require("./Document");
const enum_1 = require("../enums/enum");
let KycDocument = KycDocument_1 = class KycDocument extends typeorm_1.BaseEntity {
    id;
    profile;
    documentType;
    document = null;
    status;
    rejectionReason = null;
    reviewedAt = null;
    reviewedBy = null;
    submittedBy = null;
    approvedBy = null;
    approvedAt = null;
    rejectedBy = null;
    rejectedAt = null;
    createdAt;
    updatedAt;
    /**
     * Create a new checklist/upload row
     */
    static createKycDocument(profile, documentType, document) {
        const kycDocument = new KycDocument_1();
        kycDocument.profile = profile;
        kycDocument.documentType = documentType;
        kycDocument.document = document ?? null;
        kycDocument.status = "PENDING";
        return kycDocument;
    }
    /**
     * Attach or replace an uploaded file
     */
    attachDocument(document, submittedBy) {
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
    approve(reviewerId) {
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
    reject(reviewerId, reason) {
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
    markPending() {
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
    isApproved() {
        return this.status === "APPROVED";
    }
    isRejected() {
        return this.status === "REJECTED";
    }
    isPending() {
        return this.status === "PENDING";
    }
    hasFile() {
        return this.document !== null;
    }
};
exports.KycDocument = KycDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], KycDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => KycProfile_1.KycProfile, (profile) => profile.documents, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "kyc_profile_id" }),
    __metadata("design:type", KycProfile_1.KycProfile)
], KycDocument.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "document_type", type: "enum", enum: enum_1.KycDocumentTypes }),
    __metadata("design:type", String)
], KycDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Document_1.Document, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "document_id" }),
    __metadata("design:type", Object)
], KycDocument.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enum_1.KycDocumentStatuses, default: "PENDING" }),
    __metadata("design:type", String)
], KycDocument.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rejection_reason", type: "text", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reviewed_at", type: "datetime", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reviewed_by", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "submitted_by", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "submittedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "approved_by", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "approved_at", type: "datetime", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rejected_by", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "rejectedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rejected_at", type: "datetime", nullable: true }),
    __metadata("design:type", Object)
], KycDocument.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], KycDocument.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], KycDocument.prototype, "updatedAt", void 0);
exports.KycDocument = KycDocument = KycDocument_1 = __decorate([
    (0, typeorm_1.Entity)("m_kyc_document"),
    (0, typeorm_1.Index)(["profile", "documentType"], { unique: true })
], KycDocument);
//# sourceMappingURL=KycDocument.js.map