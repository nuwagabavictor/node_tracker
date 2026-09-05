"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docShema = void 0;
exports.upload = upload;
exports.listAllDocuments = listAllDocuments;
exports.getDocument = getDocument;
exports.downloadDocument = downloadDocument;
exports.deleteDocument = deleteDocument;
const zod_1 = require("zod");
const DocumentService_1 = require("../shared/DocumentService");
exports.docShema = zod_1.z.object({
    entityType: zod_1.z.string(),
    entityId: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
});
const documentService = new DocumentService_1.DocumentService();
async function upload(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const body = exports.docShema.parse(req.body);
        if (!body.entityType || !body.entityId || !body.name) {
            return res.status(400).json({ error: "entityType, entityId, and name are required" });
        }
        const document = await documentService.saveDocument(req.file.buffer, {
            entityType: body.entityType,
            entityId: Number(body.entityId),
            name: body.name,
            description: body.description,
            fileName: req.file.originalname,
            mimeType: req.file.mimetype
        });
        res.status(201).json(document);
    }
    catch (err) {
        next(err);
    }
}
async function listAllDocuments(req, res, next) {
    try {
        const { entityType, entityId } = req.query;
        if (!entityType || !entityId) {
            return res.status(400).json({ error: "entityType and entityId query params are required" });
        }
        const documents = await documentService.getDocuments(String(entityType), Number(entityId));
        res.json(documents);
    }
    catch (err) {
        next(err);
    }
}
async function getDocument(req, res, next) {
    try {
        const document = await documentService.getDocument(Number(req.params.id));
        res.json(document);
    }
    catch (err) {
        next(err);
    }
}
async function downloadDocument(req, res, next) {
    try {
        const { document, data } = await documentService.getDocumentContent(Number(req.params.id));
        res.setHeader("Content-Type", document.mimeType);
        res.setHeader("Content-Disposition", `attachment; filename="${document.fileName}"`);
        res.send(data);
    }
    catch (err) {
        next(err);
    }
}
async function deleteDocument(req, res, next) {
    try {
        await documentService.deleteDocument(Number(req.params.id));
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=DocumentController.js.map