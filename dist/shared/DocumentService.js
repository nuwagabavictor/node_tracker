"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const Document_1 = require("../Entities/Document");
const StorageFactory_1 = require("../storage/StorageFactory");
// mimeType the client claims. Extend as needed.
const ALLOWED_MIME_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv"
]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
class DocumentService {
    storage;
    constructor(storage = (0, StorageFactory_1.getStorage)()) {
        this.storage = storage;
    }
    async saveDocument(data, command) {
        this.validate(data, command);
        const extension = path_1.default.extname(command.fileName);
        const generatedName = `${crypto_1.default.randomUUID()}${extension}`;
        // unlike path.join which would emit backslashes on Windows.
        const key = [
            command.entityType.toLowerCase(),
            String(command.entityId),
            generatedName
        ].join("/");
        const location = await this.storage.save(key, data);
        const document = Document_1.Document.createDocument({
            name: command.name,
            fileName: command.fileName,
            entityType: command.entityType,
            entityId: command.entityId,
            size: data.length,
            location,
            description: command.description,
            mimeType: command.mimeType,
            storageType: (0, StorageFactory_1.getEnabledStorage)()
        });
        try {
            await document.save();
        }
        catch (err) {
            await this.storage.delete(location).catch(() => { });
            throw err;
        }
        return document;
    }
    async getDocuments(entityType, entityId) {
        return Document_1.Document.find({
            where: { entityType, entityId },
            order: { createdAt: "DESC" }
        });
    }
    async getDocument(id) {
        const document = await Document_1.Document.findOne({ where: { id } });
        if (!document) {
            throw new Error("Document not found");
        }
        return document;
    }
    async getDocumentContent(id) {
        const document = await this.getDocument(id);
        const data = await this.storage.get(document.location);
        return { document, data };
    }
    async deleteDocument(id) {
        const document = await this.getDocument(id);
        await document.remove();
        await this.storage.delete(document.location);
    }
    validate(data, command) {
        if (data.length === 0) {
            throw new Error("Cannot save an empty file");
        }
        if (data.length > MAX_FILE_SIZE_BYTES) {
            throw new Error(`File exceeds maximum size of ${MAX_FILE_SIZE_BYTES} bytes`);
        }
        if (!ALLOWED_MIME_TYPES.has(command.mimeType)) {
            throw new Error(`Unsupported mime type: ${command.mimeType}`);
        }
        if (!command.entityType || !command.fileName || !command.name) {
            throw new Error("entityType, fileName, and name are required");
        }
    }
}
exports.DocumentService = DocumentService;
//# sourceMappingURL=DocumentService.js.map