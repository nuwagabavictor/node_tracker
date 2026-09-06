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
var Budget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const User_1 = require("./User");
const enum_1 = require("../enums/enum");
let Budget = Budget_1 = class Budget extends typeorm_1.BaseEntity {
    id;
    amount;
    category;
    categoryId;
    user;
    userId;
    active;
    period;
    startDate;
    endDate;
    budgetExceeded;
    userNotified;
    amountSpent;
    exceededAmount;
    createdAt;
    static createBudget(params) {
        const budget = new Budget_1();
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = Budget_1.determineEndDate(startDate, params.period);
        budget.amount = params.amount;
        budget.category = params.category;
        budget.user = params.category.user;
        budget.userId = params.category.userId;
        budget.period = params.period;
        budget.startDate = startDate;
        budget.endDate = endDate;
        budget.active = true;
        return budget;
    }
    changes(params) {
        const actualChanges = {};
        // const startDate = new Date();
        // startDate.setHours(0, 0, 0, 0);
        if (params.amount !== undefined && params.amount !== this.amount) {
            this.amount = params.amount;
            actualChanges.amount = params.amount;
        }
        if (params.period !== undefined && params.period !== this.period) {
            this.period = params.period;
            //this.startDate = startDate
            const newEndDate = Budget_1.determineEndDate(this.startDate, params.period);
            this.endDate = newEndDate;
            actualChanges.period = params.period;
            actualChanges.endDate = newEndDate;
        }
        return actualChanges;
    }
    static determineEndDate(startDate, period) {
        const endDate = new Date(startDate);
        switch (period) {
            case enum_1.BudgetPeriod.WEEKLY:
                endDate.setDate(endDate.getDate() + 6);
                break;
            case enum_1.BudgetPeriod.MONTHLY:
                endDate.setMonth(endDate.getMonth() + 1);
                break;
            case enum_1.BudgetPeriod.YEARLY:
                endDate.setFullYear(endDate.getFullYear() + 1);
                break;
        }
        return endDate;
    }
    recordTransaction(amount) {
        this.amountSpent = Number(this.amountSpent || 0) + amount;
        if (this.amountSpent > Number(this.amount)) {
            this.budgetExceeded = true;
            this.exceededAmount = this.amountSpent - Number(this.amount);
        }
        else {
            this.budgetExceeded = false;
            this.exceededAmount = 0;
        }
    }
    isActive() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(this.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(this.endDate);
        end.setHours(23, 59, 59, 999);
        return today >= start && today <= end;
    }
    activate() {
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
    refreshStatus() {
        this.active = this.isActive();
    }
};
exports.Budget = Budget;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Budget.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "budget_amount", type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Budget.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", Category_1.Category)
], Budget.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id" }),
    __metadata("design:type", Number)
], Budget.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], Budget.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], Budget.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "active" }),
    __metadata("design:type", Boolean)
], Budget.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enum_1.BudgetPeriod, default: enum_1.BudgetPeriod.WEEKLY }),
    __metadata("design:type", String)
], Budget.prototype, "period", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "start_date" }),
    __metadata("design:type", Date)
], Budget.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "end_date" }),
    __metadata("design:type", Date)
], Budget.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "budget_exceeded", default: false }),
    __metadata("design:type", Boolean)
], Budget.prototype, "budgetExceeded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_notified", default: false }),
    __metadata("design:type", Boolean)
], Budget.prototype, "userNotified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "amount_spent", type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Budget.prototype, "amountSpent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "amount_exceeded", type: "decimal", precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Budget.prototype, "exceededAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Budget.prototype, "createdAt", void 0);
exports.Budget = Budget = Budget_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "m_budget" }),
    (0, typeorm_1.Unique)(["userId", "categoryId", "startDate", "endDate"])
], Budget);
//# sourceMappingURL=Budget.js.map