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
var KycProfile_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycProfile = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enums/enum");
const KycDocument_1 = require("./KycDocument");
let KycProfile = KycProfile_1 = class KycProfile extends typeorm_1.BaseEntity {
    id;
    subjectType;
    subjectId;
    status;
    rejectionReason;
    reviewedAt;
    submittedAt;
    reviewedBy;
    expiresAt;
    documents;
    createdAt;
    updatedAt;
    static createKycProfile(subjectType, subjectId) {
        const profile = new KycProfile_1();
        profile.subjectType = subjectType;
        profile.subjectId = subjectId;
        profile.status = "INCOMPLETE";
        return profile;
    }
};
exports.KycProfile = KycProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], KycProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "subject_type", type: "enum", enum: enum_1.KycSubjectTypes }),
    __metadata("design:type", String)
], KycProfile.prototype, "subjectType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "subject_id", type: "bigint" }),
    __metadata("design:type", Number)
], KycProfile.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enum_1.KycProfileStatuses, default: "INCOMPLETE" }),
    __metadata("design:type", String)
], KycProfile.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rejection_reason", type: "text", nullable: true }),
    __metadata("design:type", String)
], KycProfile.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reviewed_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], KycProfile.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "submitted_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], KycProfile.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "reviewed_by", type: "bigint", nullable: true }),
    __metadata("design:type", Number)
], KycProfile.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "expires_at", type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], KycProfile.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => KycDocument_1.KycDocument, (doc) => doc.profile),
    __metadata("design:type", Array)
], KycProfile.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], KycProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], KycProfile.prototype, "updatedAt", void 0);
exports.KycProfile = KycProfile = KycProfile_1 = __decorate([
    (0, typeorm_1.Entity)("m_kyc_profile"),
    (0, typeorm_1.Index)(["subjectType", "subjectId"], { unique: true })
], KycProfile);
//# sourceMappingURL=KycProfile.js.map