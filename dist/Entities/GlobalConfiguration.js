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
var GlobalConfiguration_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalConfiguration = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let GlobalConfiguration = GlobalConfiguration_1 = class GlobalConfiguration extends typeorm_1.BaseEntity {
    id;
    name;
    stringValue;
    user;
    userId;
    enabled;
    systemGenerated;
    createdAt;
    updatedAt;
    static createConfig(params) {
        const config = new GlobalConfiguration_1();
        config.name = params.name;
        config.user = params.user;
        config.stringValue = params.stringValue;
        config.systemGenerated = true;
        config.enabled = true;
        return config;
    }
    changes(data) {
        const actualChanges = {};
        if (data.enabled !== undefined && data.enabled !== this.enabled) {
            this.enabled = data.enabled;
            actualChanges.enabled = this.enabled;
        }
        if (data.stringValue !== undefined && data.stringValue !== this.stringValue) {
            this.stringValue = data.stringValue;
            actualChanges.stringValue = this.stringValue;
        }
        return Object.keys(actualChanges).length > 0 ? actualChanges : ({});
    }
};
exports.GlobalConfiguration = GlobalConfiguration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GlobalConfiguration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "config_name", nullable: false }),
    __metadata("design:type", String)
], GlobalConfiguration.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "string_value", nullable: true }),
    __metadata("design:type", String)
], GlobalConfiguration.prototype, "stringValue", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], GlobalConfiguration.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], GlobalConfiguration.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_enabled", default: false }),
    __metadata("design:type", Boolean)
], GlobalConfiguration.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_system_generated", default: true }),
    __metadata("design:type", Boolean)
], GlobalConfiguration.prototype, "systemGenerated", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GlobalConfiguration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], GlobalConfiguration.prototype, "updatedAt", void 0);
exports.GlobalConfiguration = GlobalConfiguration = GlobalConfiguration_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "m_configuration" }),
    (0, typeorm_1.Unique)(["userId", "name"])
], GlobalConfiguration);
//# sourceMappingURL=GlobalConfiguration.js.map