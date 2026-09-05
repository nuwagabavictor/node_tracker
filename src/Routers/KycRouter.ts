import {Router} from "express";
import {authenticate, authorize} from "../Middleware/AuthMiddleware";
import {approveDocument, getChecklist, getProfile, rejectDocument, uploadDocument} from "../controllers/KycController";
import multer from "multer";
import {asyncHandler} from "../Middleware/asyncHandler";

export const kycRouter = Router();
const upload = multer({
    storage: multer.memoryStorage()
});

// Upload / re-upload a required document
kycRouter.post(
    "/:subjectType/:subjectId/documents/:documentType",
    authenticate,
    upload.single("file"),
    asyncHandler(uploadDocument)
);

// KYC profile summary
kycRouter.get(
    "/:subjectType/:subjectId",
    authenticate,
    authorize('ADMIN'),
    asyncHandler(getProfile)
);

// Required document checklist
kycRouter.get(
    "/:subjectType/:subjectId/checklist",
    authenticate,
    asyncHandler(getChecklist)
);

// Uploaded documents for this profile
// kycRouter.get(
//     "/:subjectType/:subjectId/documents",
//     authenticate,
//     asyncHandler(listKycDocuments)
// );


// Review actions
kycRouter.post(
    "/documents/:kycDocumentId/approve",
    authenticate,
    asyncHandler(approveDocument)
);

kycRouter.post(
    "/documents/:kycDocumentId/reject",
    authenticate,
    asyncHandler(rejectDocument)
);