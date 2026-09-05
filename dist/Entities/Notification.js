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
var Notification_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
let Notification = Notification_1 = class Notification extends typeorm_1.BaseEntity {
    id;
    objectType;
    objectId;
    action;
    message;
    isSystemGenerated;
    userId;
    createdAt;
    static createNotification(params) {
        const notification = new Notification_1();
        notification.objectId = params.objectId;
        notification.objectType = params.objectType;
        notification.action = params.action;
        notification.message = params.message;
        notification.userId = params.userId;
        notification.isSystemGenerated = true;
        return notification;
    }
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "entity", length: 100 }),
    __metadata("design:type", String)
], Notification.prototype, "objectType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "entity_id" }),
    __metadata("design:type", Number)
], Notification.prototype, "objectId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_system_generated" }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isSystemGenerated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
exports.Notification = Notification = Notification_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "m_notification" })
], Notification);
//# sourceMappingURL=Notification.js.map