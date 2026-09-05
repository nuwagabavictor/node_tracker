import { BaseEntity } from "typeorm";
import { StorageType } from "../enums/enum";
export declare class Document extends BaseEntity {
    id: number;
    name: string;
    fileName: string;
    entityType: string;
    entityId: number;
    size: number;
    location: string;
    description: string;
    mimeType: string;
    storageType: StorageType;
    createdAt: Date;
    updatedAt: Date;
    static createDocument(params: {
        name: string;
        fileName: string;
        entityType: string;
        entityId: number;
        size: number;
        location: string;
        description: string;
        mimeType: string;
        storageType: StorageType;
    }): Document;
    isImage(): boolean;
    isPdf(): boolean;
    isExcel(): boolean;
}
//# sourceMappingURL=Document.d.ts.map