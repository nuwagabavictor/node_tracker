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
var NotificationMapper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationMapper = void 0;
const typeorm_1 = require("typeorm");
const Notification_1 = require("./Notification");
const User_1 = require("./User");
let NotificationMapper = NotificationMapper_1 = class NotificationMapper extends typeorm_1.BaseEntity {
    id;
    notification;
    notificationId;
    user;
    userId;
    isRead;
    createdAt;
    static createNotificationMapper(params) {
        const mapper = new NotificationMapper_1();
        mapper.notification = params.notification;
        mapper.user = params.user;
        mapper.isRead = false;
        return mapper;
    }
};
exports.NotificationMapper = NotificationMapper;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationMapper.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Notification_1.Notification, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "notification_id" }),
    __metadata("design:type", Notification_1.Notification)
], NotificationMapper.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "notification_id" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], NotificationMapper.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], NotificationMapper.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], NotificationMapper.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_read", default: false }),
    __metadata("design:type", Boolean)
], NotificationMapper.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationMapper.prototype, "createdAt", void 0);
exports.NotificationMapper = NotificationMapper = NotificationMapper_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "m_notification_mapper" }),
    (0, typeorm_1.Unique)(["userId", "notificationId"])
], NotificationMapper);
//# sourceMappingURL=NotificationMapper.js.map