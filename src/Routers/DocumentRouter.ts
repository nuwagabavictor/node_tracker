import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {
    deleteDocument,
    downloadDocument,
    getDocument,
    listAllDocuments,
    upload
} from "../controllers/DocumentController";


export const documentRouter = Router();

documentRouter.post('/:entityType/:entityId/documents' , authenticate, asyncHandler(upload));
documentRouter.get('/:entityType/:entityId/documents', authenticate, asyncHandler(listAllDocuments));
documentRouter.get('/:entityType/:entityId/documents/:documentId', authenticate, asyncHandler(getDocument));
documentRouter.get('/:entityType/:entityId/documents/:documentId/download', authenticate, asyncHandler(downloadDocument));
documentRouter.delete('/:entityType/:entityId/documents/:documentId/delete', authenticate, asyncHandler(deleteDocument));