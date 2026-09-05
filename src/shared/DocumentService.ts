import crypto from "crypto";
import path from "path";
import { Document } from "../Entities/Document";
import { FileStorage } from "../storage/FileStorage";
import { getStorage, getEnabledStorage } from "../storage/StorageFactory";

export type DocumentCommand = {
    entityType: string;
    entityId: number;
    name: string;
    fileName: string;
    description: string;
    mimeType: string;
};

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

export class DocumentService {


    constructor(private readonly storage: FileStorage = getStorage()) {}

    async saveDocument(data: Buffer, command: DocumentCommand): Promise<Document> {
        this.validate(data, command);

        const extension = path.extname(command.fileName);
        const generatedName = `${crypto.randomUUID()}${extension}`;

        // unlike path.join which would emit backslashes on Windows.
        const key = [
            command.entityType.toLowerCase(),
            String(command.entityId),
            generatedName
        ].join("/");

        const location = await this.storage.save(key, data);

        const document = Document.createDocument({
            name: command.name,
            fileName: command.fileName,
            entityType: command.entityType,
            entityId: command.entityId,
            size: data.length,
            location,
            description: command.description,
            mimeType: command.mimeType,
            storageType: getEnabledStorage()
        });

        try {
            await document.save();
        } catch (err) {
            await this.storage.delete(location).catch(() => {});
            throw err;
        }

        return document;
    }

    async getDocuments(entityType: string, entityId: number): Promise<Document[]> {
        return Document.find({
            where: { entityType, entityId },
            order: { createdAt: "DESC" }
        });
    }

    async getDocument(id: number): Promise<Document> {
        const document = await Document.findOne({ where: { id } });

        if (!document) {
            throw new Error("Document not found");
        }

        return document;
    }

    async getDocumentContent(id: number): Promise<{ document: Document; data: Buffer }> {
        const document = await this.getDocument(id);
        const data = await this.storage.get(document.location);

        return { document, data };
    }

    async deleteDocument(id: number): Promise<void> {
        const document = await this.getDocument(id);
        await document.remove();
        await this.storage.delete(document.location);
    }

    private validate(data: Buffer, command: DocumentCommand): void {
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
