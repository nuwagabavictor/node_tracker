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
var PasswordToken_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordToken = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let PasswordToken = PasswordToken_1 = class PasswordToken extends typeorm_1.BaseEntity {
    id;
    user;
    userId;
    otpHash;
    revoked;
    expiresAt;
    createdAt;
    isExpired() {
        return new Date() > this.expiresAt;
    }
    isValid() {
        return !this.revoked && !this.isExpired();
    }
    markUsed() {
        this.revoked = true;
    }
    static createPasswordToken(params) {
        const token = new PasswordToken_1();
        token.user = params.user;
        token.otpHash = params.tokenHash;
        token.revoked = false;
        token.expiresAt = new Date(Date.now() + params.expiryMinutes * 60 * 1000);
        return token;
    }
};
exports.PasswordToken = PasswordToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PasswordToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], PasswordToken.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], PasswordToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], PasswordToken.prototype, "otpHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PasswordToken.prototype, "revoked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime" }),
    __metadata("design:type", Date)
], PasswordToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PasswordToken.prototype, "createdAt", void 0);
exports.PasswordToken = PasswordToken = PasswordToken_1 = __decorate([
    (0, typeorm_1.Entity)("m_password_token")
], PasswordToken);
//# sourceMappingURL=PasswordToken.js.map