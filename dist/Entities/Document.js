"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Document_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enums/enum");
const EXCEL_MIME_TYPES = new Set([
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv"
]);
let Document = Document_1 = class Document extends typeorm_1.BaseEntity {
    id;
    name;
    fileName;
    entityType;
    entityId;
    size;
    location;
    description;
    mimeType;
    storageType;
    createdAt;
    updatedAt;
    static createDocument(params) {
        const doc = new Document_1();
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
    isImage() {
        return this.mimeType.startsWith("image/");
    }
    isPdf() {
        return this.mimeType === "application/pdf";
    }
    // Fixed: compared against a literal "excel" before, which can never
    // match a real MIME type. Now checks against the actual Excel/CSV
    // MIME types browsers and servers actually send.
    isExcel() {
        return EXCEL_MIME_TYPES.has(this.mimeType);
    }
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Document.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "file_name", length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "parent_entity_type", length: 100 }),
    __metadata("design:type", String)
], Document.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "parent_entity_id", type: "bigint" }),
    __metadata("design:type", Number)
], Document.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], Document.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Document.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Document.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "storage_type", type: "enum", enum: enum_1.StorageTypes }),
    __metadata("design:type", String)
], Document.prototype, "storageType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
exports.Document = Document = Document_1 = __decorate([
    (0, typeorm_1.Entity)("m_document"),
    (0, typeorm_1.Index)(["entityType", "entityId"])
], Document);
//# sourceMappingURL=Document.js.map