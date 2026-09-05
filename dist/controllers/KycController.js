"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocument = uploadDocument;
exports.getProfile = getProfile;
exports.getChecklist = getChecklist;
exports.approveDocument = approveDocument;
exports.rejectDocument = rejectDocument;
const enum_1 = require("../enums/enum");
const KycService_1 = require("../shared/KycService");
const DocumentService_1 = require("../shared/DocumentService");
const kycService = new KycService_1.KycService(new DocumentService_1.DocumentService());
function isSubjectType(value) {
    return enum_1.KycSubjectTypes.includes(value);
}
function isDocumentType(value) {
    return enum_1.KycDocumentTypes.includes(value);
}
function parseSubject(req) {
    const { subjectType, subjectId } = req.params;
    if (!isSubjectType(subjectType)) {
        throw new Error(`Invalid subjectType: ${subjectType}`);
    }
    return { subjectType, subjectId: Number(subjectId) };
}
async function uploadDocument(req, res, next) {
    try {
        const { subjectType, subjectId } = parseSubject(req);
        const { documentType } = req.params;
        if (!isDocumentType(documentType)) {
            return res.status(400).json({ error: `Invalid documentType: ${documentType}` });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const kycDocument = await kycService.uploadDocument(subjectType, subjectId, documentType, req.file.buffer, { fileName: req.file.originalname, mimeType: req.file.mimetype }, req.user?.id);
        res.status(201).json({
            id: kycDocument.id,
            documentType: kycDocument.documentType,
            status: kycDocument.status,
            uploadedAt: kycDocument.updatedAt
        });
    }
    catch (err) {
        next(err);
    }
}
async function getProfile(req, res, next) {
    try {
        const { subjectType, subjectId } = parseSubject(req);
        const profile = await kycService.getOrCreateProfile(subjectType, subjectId);
        const checklist = await kycService.getChecklist(subjectType, subjectId);
        res.json({
            id: profile.id,
            subjectType: profile.subjectType,
            subjectId: profile.subjectId,
            status: profile.status,
            submittedAt: profile.submittedAt,
            reviewedAt: profile.reviewedAt,
            checklist
        });
    }
    catch (err) {
        next(err);
    }
}
async function getChecklist(req, res, next) {
    try {
        const { subjectType, subjectId } = parseSubject(req);
        const checklist = await kycService.getChecklist(subjectType, subjectId);
        res.json(checklist);
    }
    catch (err) {
        next(err);
    }
}
async function approveDocument(req, res, next) {
    try {
        const reviewerId = req.user?.id;
        if (!reviewerId) {
            return res.status(401).json({ error: "Reviewer not authenticated" });
        }
        const document = await kycService.reviewDocument(Number(req.params.kycDocumentId), "APPROVED", reviewerId);
        res.json({ id: document.id,
            status: document.status,
            reviewedAt: document.reviewedAt
        });
    }
    catch (err) {
        next(err);
    }
}
async function rejectDocument(req, res, next) {
    try {
        const reviewerId = req.user?.id;
        if (!reviewerId) {
            return res.status(401).json({ error: "Reviewer not authenticated" });
        }
        const reason = String(req.body.reason ?? "").trim();
        if (!reason) {
            return res.status(400).json({ error: "reason is required" });
        }
        const document = await kycService.reviewDocument(Number(req.params.kycDocumentId), "REJECTED", reviewerId, reason);
        res.json({
            id: document.id,
            status: document.status,
            rejectionReason: document.rejectionReason,
            reviewedAt: document.reviewedAt
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=KycController.js.map