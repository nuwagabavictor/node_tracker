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
var Category_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enums/enum");
const User_1 = require("./User");
let Category = Category_1 = class Category extends typeorm_1.BaseEntity {
    id;
    name;
    type;
    description;
    active;
    user;
    userId;
    createdAt;
    updatedAt;
    static createCategory(params) {
        const category = new Category_1();
        category.name = params.name;
        category.type = params.type;
        category.description = params.description;
        category.active = true;
        category.user = params.user;
        return category;
    }
    changes(params) {
        const actualChanges = {};
        if (params.name !== undefined && params.name !== this.name) {
            this.name = params.name;
            actualChanges.name = this.name;
        }
        if (params.type !== undefined && params.type !== this.type) {
            this.type = params.type;
            actualChanges.type = this.type;
        }
        if (params.active !== undefined && params.active !== this.active) {
            this.active = params.active;
            actualChanges.active = this.active;
        }
        if (params.description !== undefined && params.description !== this.description) {
            this.description = params.description;
            actualChanges.description = this.description;
        }
        return actualChanges;
    }
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_name", length: 100, nullable: false }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_type", type: "enum", enum: enum_1.CategoryTypes }),
    __metadata("design:type", String)
], Category.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_description", nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Category.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], Category.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
exports.Category = Category = Category_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "m_category" }),
    (0, typeorm_1.Unique)(["userId", "name"])
], Category);
//# sourceMappingURL=Category.js.map