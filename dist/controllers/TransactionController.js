"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transObj = void 0;
exports.createTransaction = createTransaction;
exports.updateTransaction = updateTransaction;
exports.findAllTransaction = findAllTransaction;
exports.findTransaction = findTransaction;
const zod_1 = require("zod");
const Category_1 = require("../Entities/Category");
const Transaction_1 = require("../Entities/Transaction");
const BusinessEventNotifierService_1 = require("../events/BusinessEventNotifierService");
const TransactionCreatedBusinessEvent_1 = require("../events/initiators/TransactionCreatedBusinessEvent");
const Budget_1 = require("../Entities/Budget");
exports.transObj = zod_1.z.object({
    categoryId: zod_1.z.number(),
    amount: zod_1.z.number(),
    description: zod_1.z.string().optional(),
});
async function createTransaction(req, res, next) {
    try {
        const body = exports.transObj.parse(req.body);
        const userId = Number(req.user?.id);
        const category = await Category_1.Category.findOne({ where: { id: body.categoryId, userId: userId } });
        if (!category)
            throw new Error("Category not found");
        if (!category.active)
            throw new Error("Category not active");
        if (body.amount <= 0)
            throw new Error("Amount must be greater than 0");
        const transaction = Transaction_1.Transaction.createTransaction({
            amount: body.amount,
            category: category,
            description: body.description
        });
        await transaction.save();
        const budget = await Budget_1.Budget.findOne({
            where: {
                userId: userId,
                categoryId: category.id,
                active: true
            }
        });
        if (budget) {
            budget.recordTransaction(transaction.amount);
            await budget.save();
        }
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new TransactionCreatedBusinessEvent_1.TransactionCreatedBusinessEvent(transaction));
        res.status(201).json({
            message: "Transaction created",
            category: transaction.category.name,
            amount: transaction.amount,
        });
    }
    catch (e) {
        next(e);
    }
}
async function updateTransaction(req, res, next) {
    try {
        const body = exports.transObj.parse(req.body);
        const userId = Number(req.user?.id);
        const transId = Number(req.params.id);
        const transaction = await Transaction_1.Transaction.findOne({ where: { id: transId, userId: userId } });
        if (!transaction)
            throw new Error("Transaction not found");
        const category = await Category_1.Category.findOne({ where: { id: body.categoryId, userId: userId } });
        if (!category)
            throw new Error("Category not found");
        if (body.amount <= 0)
            throw new Error("Amount must be greater than 0");
        const changes = transaction.changes({ amount: body.amount, category: category, description: body.description });
        if (Object.keys(changes).length > 0) {
            await transaction.save();
        }
        res.status(201).json({
            message: "Transaction updated",
            changes: changes,
        });
    }
    catch (e) {
        next(e);
    }
}
async function findAllTransaction(req, res, next) {
    try {
        const userId = Number(req.user?.id);
        const transactions = await Transaction_1.Transaction.find({
            where: {
                userId: userId
            },
            relations: {
                category: true,
                user: true,
            },
            order: {
                id: "DESC"
            }
        });
        const data = transactions.map(transaction => ({
            id: transaction.id,
            category: transaction.category.name,
            categoryId: transaction.category.id,
            categoryType: transaction.category.type,
            transactionType: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            createdAt: transaction.createdAt,
        }));
        res.status(201).json({
            transactions: data,
        });
    }
    catch (e) {
        next(e);
    }
}
async function findTransaction(req, res, next) {
    try {
        const userId = Number(req.user?.id);
        const transId = Number(req.params.id);
        const transaction = await Transaction_1.Transaction.findOne({
            where: {
                id: transId,
                userId: userId
            },
            relations: {
                category: true,
                user: true,
            },
            order: {
                id: "DESC"
            }
        });
        if (!transaction)
            throw new Error("Transaction not found");
        const data = {
            id: transaction.id,
            category: transaction.category.name,
            categoryId: transaction.category.id,
            categoryType: transaction.category.type,
            transactionType: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            createdAt: transaction.createdAt,
        };
        res.status(201).json({
            transaction: data,
        });
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=TransactionController.js.map