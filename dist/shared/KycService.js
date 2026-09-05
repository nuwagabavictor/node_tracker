"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycService = void 0;
const enum_1 = require("../enums/enum");
const KycProfile_1 = require("../Entities/KycProfile");
const KycDocument_1 = require("../Entities/KycDocument");
class KycService {
    documentService;
    constructor(documentService) {
        this.documentService = documentService;
    }
    async getOrCreateProfile(subjectType, subjectId) {
        let profile = await KycProfile_1.KycProfile.findOne({ where: { subjectType, subjectId } });
        if (!profile) {
            profile = KycProfile_1.KycProfile.createKycProfile(subjectType, subjectId);
            await profile.save();
        }
        return profile;
    }
    async uploadDocument(subjectType, subjectId, documentType, fileBuffer, file, submittedBy) {
        const required = enum_1.KYC_REQUIREMENTS[subjectType];
        if (!required.includes(documentType)) {
            throw new Error(`${documentType} is not required for ${subjectType}`);
        }
        const profile = await this.getOrCreateProfile(subjectType, subjectId);
        const storedDocument = await this.documentService.saveDocument(fileBuffer, {
            entityType: `KYC_${subjectType}`,
            entityId: subjectId,
            name: `${documentType} - ${subjectType} ${subjectId}`,
            fileName: file.fileName,
            description: `${subjectType}:${subjectId}`,
            mimeType: file.mimeType
        });
        let kycDocument = await KycDocument_1.KycDocument.findOne({ where: { profile: { id: profile.id }, documentType },
            relations: ["document"] });
        if (!kycDocument) {
            kycDocument = KycDocument_1.KycDocument.createKycDocument(profile, documentType, storedDocument);
            kycDocument.submittedBy = submittedBy ?? null;
        }
        else {
            if (kycDocument.document) {
                await this.documentService.deleteDocument(kycDocument.document.id);
            }
            kycDocument.attachDocument(storedDocument, submittedBy);
        }
        await kycDocument.save();
        await this.recomputeProfileStatus(profile.id);
        return kycDocument;
    }
    async reviewDocument(kycDocumentId, decision, reviewerId, rejectionReason) {
        const kycDocument = await KycDocument_1.KycDocument.findOne({ where: { id: kycDocumentId }, relations: ["profile", "document"] });
        if (!kycDocument) {
            throw new Error("KYC document not found");
        }
        if (decision === "APPROVED") {
            kycDocument.approve(reviewerId);
        }
        else {
            kycDocument.reject(reviewerId, rejectionReason ?? "");
        }
        await kycDocument.save();
        await this.recomputeProfileStatus(kycDocument.profile.id);
        return kycDocument;
    }
    async getChecklist(subjectType, subjectId) {
        const profile = await this.getOrCreateProfile(subjectType, subjectId);
        const submitted = await KycDocument_1.KycDocument.find({ where: { profile: { id: profile.id } },
            relations: ["document"]
        });
        const byType = new Map(submitted.map(d => [d.documentType, d]));
        return enum_1.KYC_REQUIREMENTS[subjectType].map(documentType => {
            const doc = byType.get(documentType);
            if (!doc) {
                return { documentType, status: "MISSING" };
            }
            return {
                documentType,
                status: doc.status,
                rejectionReason: doc.rejectionReason,
                documentId: doc.document?.id
            };
        });
    }
    async recomputeProfileStatus(profileId) {
        const profile = await KycProfile_1.KycProfile.findOneOrFail({ where: { id: profileId } });
        const checklist = await this.getChecklist(profile.subjectType, profile.subjectId);
        const statuses = checklist.map(c => c.status);
        if (statuses.every(s => s === "APPROVED")) {
            profile.status = "APPROVED";
            profile.reviewedAt = new Date();
        }
        else if (statuses.includes("REJECTED")) {
            profile.status = "REJECTED";
        }
        else if (statuses.includes("MISSING")) {
            profile.status = "INCOMPLETE";
        }
        else {
            profile.status = "PENDING_REVIEW";
            profile.submittedAt ??= new Date();
        }
        await profile.save();
    }
}
exports.KycService = KycService;
//# sourceMappingURL=KycService.js.map