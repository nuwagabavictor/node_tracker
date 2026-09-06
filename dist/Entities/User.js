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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enums/enum");
let User = User_1 = class User extends typeorm_1.BaseEntity {
    id;
    username;
    email;
    phone;
    password;
    enabled;
    locked;
    deleted;
    twoFactorEnabled;
    accountNonExpired;
    accountNonLocked;
    credentialsNonExpired;
    firstTimeLogin;
    failedLoginAttempts;
    lockUntil;
    role;
    createdAt;
    updatedAt;
    // ==========================
    // FACTORY METHOD
    // ==========================
    static async fromJson(params) {
        const user = new User_1();
        user.username = params.username;
        user.email = params.email;
        user.password = params.password;
        user.role = params.role;
        user.phone = params.phone;
        user.enabled = true;
        user.locked = false;
        user.deleted = false;
        user.twoFactorEnabled = false;
        user.accountNonExpired = true;
        user.credentialsNonExpired = true;
        user.firstTimeLogin = true;
        return user;
    }
    // ==========================
    // BUSINESS BEHAVIOURS
    // ==========================
    enable() {
        if (this.deleted) {
            throw new Error("Deleted user cannot be enabled");
        }
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    unlock() {
        this.locked = false;
        this.failedLoginAttempts = 0;
    }
    enableTwoFactor() {
        this.twoFactorEnabled = true;
    }
    disableTwoFactor() {
        this.twoFactorEnabled = false;
    }
    completeFirstLogin() {
        this.firstTimeLogin = false;
    }
    expireAccount() {
        this.accountNonExpired = false;
    }
    activateAccount() {
        this.accountNonExpired = true;
    }
    expireCredentials() {
        this.credentialsNonExpired = false;
    }
    changeRole(role) {
        this.role = role;
    }
    changePassword(newPassword) {
        this.password = newPassword;
        this.credentialsNonExpired = true;
    }
    delete() {
        this.deleted = true;
        this.enabled = false;
    }
    recordFailedLogin(maxAttempts, lockPeriodMinutes) {
        // Already locked and lock period has not expired
        if (!this.accountNonLocked && this.locked && this.lockUntil && new Date() < this.lockUntil) {
            return;
        }
        // Reset lock if expired
        if (!this.accountNonLocked && this.locked && this.lockUntil && new Date() >= this.lockUntil) {
            this.accountNonLocked = true;
            this.lockUntil = undefined;
            this.failedLoginAttempts = 0;
            this.locked = false;
        }
        this.failedLoginAttempts++;
        if (this.failedLoginAttempts >= maxAttempts) {
            this.accountNonLocked = false;
            this.locked = true;
            this.lockUntil = new Date(Date.now() + lockPeriodMinutes * 60 * 1000);
        }
    }
    recordSuccessfulLogin() {
        this.failedLoginAttempts = 0;
        this.accountNonLocked = true;
        this.lockUntil = undefined;
        this.locked = false;
    }
    changes(data) {
        const actualChanges = {};
        if (data.username !== undefined && data.username !== this.username) {
            this.username = data.username;
            actualChanges.username = this.username;
        }
        if (data.email !== undefined && data.email !== this.email) {
            this.email = data.email;
            actualChanges.email = this.email;
        }
        if (data.phone !== undefined && data.phone !== this.phone) {
            this.phone = data.phone;
            actualChanges.phone = this.phone;
        }
        return actualChanges;
    }
    // ==========================
    // QUERIES
    // ==========================
    isAccountActive() {
        return (this.enabled && !this.locked && !this.deleted && this.accountNonExpired && this.credentialsNonExpired);
    }
    canLogin() {
        return this.isAccountActive();
    }
    hasTwoFactor() {
        return this.twoFactorEnabled;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getId() {
        return this.id;
    }
    getRole() {
        return this.role;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "locked", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "twoFactorEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "accountNonExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "accountNonLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "credentialsNonExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "firstTimeLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "failedLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lock_until', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lockUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enum_1.Roles }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = User_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "m_user" })
], User);
//# sourceMappingURL=User.js.map