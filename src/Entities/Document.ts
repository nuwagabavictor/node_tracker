import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { StorageType, StorageTypes } from "../enums/enum";

const EXCEL_MIME_TYPES = new Set([
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv"
]);

@Entity("m_document")
@Index(["entityType", "entityId"])
export class Document extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 150 })
    name!: string;

    @Column({ name: "file_name", length: 255 })
    fileName!: string;

    @Column({ name: "parent_entity_type", length: 100 })
    entityType!: string;

    @Column({ name: "parent_entity_id", type: "bigint" })
    entityId!: number;

    @Column({ type: "bigint" })
    size!: number;

    @Column({ length: 500 })
    location!: string;

    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ length: 100 })
    mimeType!: string;

    @Column({ name: "storage_type", type: "enum", enum: StorageTypes })
    storageType!: StorageType;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

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
    }): Document {
        const doc = new Document();

        doc.name = params.name;
        doc.fileName = params.fileName;
        doc.entityType = params.entityType;
        doc.entityId = params.entityId;
        doc.size = params.size;
        doc.location = params.location;
        doc.description = params.description;
        doc.mimeType = params.mimeType;
        doc.storageType = params.storageType;

        return doc;
    }

    isImage(): boolean {
        return this.mimeType.startsWith("image/");
    }

    isPdf(): boolean {
        return this.mimeType === "application/pdf";
    }

    // Fixed: compared against a literal "excel" before, which can never
    // match a real MIME type. Now checks against the actual Excel/CSV
    // MIME types browsers and servers actually send.
    isExcel(): boolean {
        return EXCEL_MIME_TYPES.has(this.mimeType);
    }
}
