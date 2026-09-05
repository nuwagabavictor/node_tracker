"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kycRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const KycController_1 = require("../controllers/KycController");
const multer_1 = __importDefault(require("multer"));
const asyncHandler_1 = require("../Middleware/asyncHandler");
exports.kycRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
// Upload / re-upload a required document
exports.kycRouter.post("/:subjectType/:subjectId/documents/:documentType", AuthMiddleware_1.authenticate, upload.single("file"), (0, asyncHandler_1.asyncHandler)(KycController_1.uploadDocument));
// KYC profile summary
exports.kycRouter.get("/:subjectType/:subjectId", AuthMiddleware_1.authenticate, (0, AuthMiddleware_1.authorize)('ADMIN'), (0, asyncHandler_1.asyncHandler)(KycController_1.getProfile));
// Required document checklist
exports.kycRouter.get("/:subjectType/:subjectId/checklist", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(KycController_1.getChecklist));
// Uploaded documents for this profile
// kycRouter.get(
//     "/:subjectType/:subjectId/documents",
//     authenticate,
//     asyncHandler(listKycDocuments)
// );
// Review actions
exports.kycRouter.post("/documents/:kycDocumentId/approve", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(KycController_1.approveDocument));
exports.kycRouter.post("/documents/:kycDocumentId/reject", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(KycController_1.rejectDocument));
//# sourceMappingURL=KycRouter.js.map