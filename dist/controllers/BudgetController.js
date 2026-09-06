"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetRequestUpdate = exports.budgetRequest = void 0;
exports.createBudget = createBudget;
exports.updateBudget = updateBudget;
exports.findAllBudgets = findAllBudgets;
exports.findBudget = findBudget;
const zod_1 = require("zod");
const enum_1 = require("../enums/enum");
const Category_1 = require("../Entities/Category");
const Budget_1 = require("../Entities/Budget");
const BusinessEventNotifierService_1 = require("../events/BusinessEventNotifierService");
const BudgetCreatedBusinessEvent_1 = require("../events/initiators/BudgetCreatedBusinessEvent");
const BudgetRepository_1 = require("../repository/BudgetRepository");
exports.budgetRequest = zod_1.z.object({
    amount: zod_1.z.number(),
    period: zod_1.z.enum(enum_1.BudgetPeriod),
    categoryId: zod_1.z.number(),
});
exports.budgetRequestUpdate = zod_1.z.object({
    amount: zod_1.z.number(),
    period: zod_1.z.enum(enum_1.BudgetPeriod),
});
const budgetRepository = new BudgetRepository_1.BudgetRepository();
async function createBudget(req, res, next) {
    try {
        const body = exports.budgetRequest.parse(req.body);
        const userId = Number(req.user?.id);
        const category = await Category_1.Category.findOne({ where: { id: body.categoryId, userId: userId } });
        if (!category)
            throw new Error("Category not found");
        if (!category.active)
            throw new Error("Category is not active");
        if (body.amount <= 0)
            throw new Error("Amount must be greater than 0");
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = Budget_1.Budget.determineEndDate(startDate, body.period);
        const overlappingBudget = await budgetRepository.checkOverlappingBudget(userId, body.categoryId, startDate, endDate);
        if (overlappingBudget) {
            throw new Error("An active budget already exists for this category during the selected period.");
        }
        const budget = Budget_1.Budget.createBudget({
            amount: body.amount,
            category: category,
            period: body.period
        });
        await budget.save();
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new BudgetCreatedBusinessEvent_1.BudgetCreatedBusinessEvent(budget));
        res.status(201).json({
            message: "Budget created"
        });
    }
    catch (e) {
        next(e);
    }
}
async function updateBudget(req, res, next) {
    try {
        const data = exports.budgetRequestUpdate.parse(req.body);
        const budgetId = Number(req.params.id);
        const userId = Number(req.user?.id);
        const existing = await Budget_1.Budget.findOne({
            where: { id: budgetId, userId: userId },
            relations: { category: true }
        });
        if (!existing)
            throw new Error("Budget not found");
        const category = existing.category;
        if (!category.active)
            throw new Error("Category is not active");
        const newEndDate = Budget_1.Budget.determineEndDate(existing.startDate, data.period);
        if (data.amount <= 0)
            throw new Error("Amount must be greater than 0");
        const overlappingBudget = await budgetRepository.checkOverlappingBudget(userId, existing.categoryId, existing.startDate, newEndDate, existing.id);
        if (overlappingBudget) {
            throw new Error("An active budget already exists for this category during the selected period.");
        }
        const changes = existing.changes({ amount: data.amount, period: data.period });
        if (Object.keys(changes).length > 0) {
            await existing.save();
        }
        res.status(201).json({
            message: "Budget updated",
            changes: changes
        });
    }
    catch (e) {
        next(e);
    }
}
async function findAllBudgets(req, res, next) {
    try {
        const userId = Number(req.user?.id);
        const budgets = await Budget_1.Budget.find({
            where: {
                userId: userId
            },
            relations: {
                category: true
            },
            order: {
                id: "DESC"
            }
        });
        const data = budgets.map(budget => ({
            id: budget.id,
            amount: budget.amount,
            period: budget.period,
            amountSpent: budget.amountSpent,
            exceededAmount: budget.exceededAmount,
            categoryName: budget.category.name,
            categoryId: budget.category.id,
            categoryType: budget.category.type,
            startDate: budget.startDate,
            endDate: budget.endDate,
            createdAt: budget.createdAt,
            isActive: budget.active,
            isBudgetExceeded: budget.budgetExceeded
        }));
        res.status(201).json({
            budgets: data
        });
    }
    catch (e) {
        next(e);
    }
}
async function findBudget(req, res, next) {
    try {
        const budgetId = Number(req.params.id);
        const userId = Number(req.user?.id);
        const budget = await Budget_1.Budget.findOne({
            where: { id: budgetId, userId: userId }
        });
        if (!budget) {
            throw new Error("Budget not found");
        }
        const data = {
            id: budget.id,
            amount: budget.amount,
            period: budget.period,
            amountSpent: budget.amountSpent,
            exceededAmount: budget.exceededAmount,
            categoryName: budget.category.name,
            categoryId: budget.category.id,
            categoryType: budget.category.type,
            startDate: budget.startDate,
            endDate: budget.endDate,
            createdAt: budget.createdAt,
            isActive: budget.active,
            isBudgetExceeded: budget.budgetExceeded
        };
        res.status(200).json({
            budget: data
        });
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=BudgetController.js.map