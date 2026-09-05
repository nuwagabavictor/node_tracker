import { Request, Response, NextFunction } from "express";
import { KycDocumentType, KycDocumentTypes, KycSubjectType, KycSubjectTypes } from "../enums/enum";
import { KycService } from "../shared/KycService";
import {DocumentService} from "../shared/DocumentService";
import { ParamsDictionary } from "express-serve-static-core";


const kycService = new KycService(new DocumentService());

type UploadParams = ParamsDictionary & {
    subjectType: string;
    subjectId: string;
    documentType: string;
};

type UploadRequest = Request<UploadParams> & {
    file?: Express.Multer.File;
};

function isSubjectType(value: string): value is KycSubjectType {
    return (KycSubjectTypes as readonly string[]).includes(value);
}

function isDocumentType(value: string): value is KycDocumentType {
    return (KycDocumentTypes as readonly string[]).includes(value);
}

type SubjectParams = ParamsDictionary & {
    subjectType: string;
    subjectId: string;
};


function parseSubject(req: Request<SubjectParams>) {
    const { subjectType, subjectId } = req.params;
    if (!isSubjectType(subjectType)) {
        throw new Error(`Invalid subjectType: ${subjectType}`);
    }
    return { subjectType, subjectId: Number(subjectId) };
}

export async function uploadDocument( req: UploadRequest, res: Response, next: NextFunction ) {
    try {
        const { subjectType, subjectId } = parseSubject(req);
        const { documentType } = req.params;

        if (!isDocumentType(documentType)) {
            return res.status(400).json({ error: `Invalid documentType: ${documentType}` });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const kycDocument = await kycService.uploadDocument( subjectType, subjectId, documentType, req.file.buffer, { fileName: req.file.originalname, mimeType: req.file.mimetype }, req.user?.id );
        res.status(201).json(
            {
                id: kycDocument.id,
                documentType: kycDocument.documentType,
                status: kycDocument.status,
                uploadedAt: kycDocument.updatedAt
            }
        );
    } catch (err) {
        next(err);
    }
}

export async function getProfile( req: Request<SubjectParams>, res: Response, next: NextFunction ) {
    try {
        const { subjectType, subjectId } = parseSubject(req);
        const profile = await kycService.getOrCreateProfile( subjectType, subjectId );
        const checklist = await kycService.getChecklist( subjectType, subjectId );
        res.json({
            id: profile.id,
            subjectType: profile.subjectType,
            subjectId: profile.subjectId,
            status: profile.status,
            submittedAt: profile.submittedAt,
            reviewedAt: profile.reviewedAt,
            checklist });
    } catch (err) {
        next(err);
    }
}

export async function getChecklist( req: Request<SubjectParams>, res: Response, next: NextFunction ) {
    try {
        const { subjectType, subjectId } = parseSubject(req);

        const checklist = await kycService.getChecklist( subjectType, subjectId );

        res.json(checklist);
    } catch (err) {
        next(err);
    }
}

export async function approveDocument( req: Request, res: Response, next: NextFunction ) {
    try {
        const reviewerId = req.user?.id;

        if (!reviewerId) {
            return res.status(401).json({ error: "Reviewer not authenticated" });
        }

        const document = await kycService.reviewDocument( Number(req.params.kycDocumentId), "APPROVED", reviewerId );
        res.json({ id: document.id,
            status: document.status,
            reviewedAt: document.reviewedAt
        });
    } catch (err) {
        next(err);
    }
}

export async function rejectDocument( req: Request, res: Response, next: NextFunction ) {
    try {
        const reviewerId = req.user?.id;

        if (!reviewerId) {
            return res.status(401).json({ error: "Reviewer not authenticated" });
        }

        const reason = String(req.body.reason ?? "").trim();

        if (!reason) {
            return res.status(400).json({ error: "reason is required" });
        }

        const document = await kycService.reviewDocument( Number(req.params.kycDocumentId), "REJECTED", reviewerId, reason );

        res.json({
            id: document.id,
            status: document.status,
            rejectionReason: document.rejectionReason,
            reviewedAt: document.reviewedAt
        });
    } catch (err) {
        next(err);
    }
}