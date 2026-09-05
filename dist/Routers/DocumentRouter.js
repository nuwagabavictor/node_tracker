"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const DocumentController_1 = require("../controllers/DocumentController");
exports.documentRouter = (0, express_1.Router)();
exports.documentRouter.post('/:entityType/:entityId/documents', AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(DocumentController_1.upload));
exports.documentRouter.get('/:entityType/:entityId/documents', AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(DocumentController_1.listAllDocuments));
exports.documentRouter.get('/:entityType/:entityId/documents/:documentId', AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(DocumentController_1.getDocument));
exports.documentRouter.get('/:entityType/:entityId/documents/:documentId/download', AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(DocumentController_1.downloadDocument));
exports.documentRouter.delete('/:entityType/:entityId/documents/:documentId/delete', AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(DocumentController_1.deleteDocument));
//# sourceMappingURL=DocumentRouter.js.map