import { Document } from "../Entities/Document";
import { FileStorage } from "../storage/FileStorage";
export type DocumentCommand = {
    entityType: string;
    entityId: number;
    name: string;
    fileName: string;
    description: string;
    mimeType: string;
};
export declare class DocumentService {
    private readonly storage;
    constructor(storage?: FileStorage);
    saveDocument(data: Buffer, command: DocumentCommand): Promise<Document>;
    getDocuments(entityType: string, entityId: number): Promise<Document[]>;
    getDocument(id: number): Promise<Document>;
    getDocumentContent(id: number): Promise<{
        document: Document;
        data: Buffer;
    }>;
    deleteDocument(id: number): Promise<void>;
    private validate;
}
//# sourceMappingURL=DocumentService.d.ts.map