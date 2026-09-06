"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = require("./AuthRouter");
const DocumentRouter_1 = require("./DocumentRouter");
const NotificationRouter_1 = require("./NotificationRouter");
const ConfigurationRouter_1 = require("./ConfigurationRouter");
const CategoryRouter_1 = require("./CategoryRouter");
const TransactionRouter_1 = require("./TransactionRouter");
const BudgetRouter_1 = require("./BudgetRouter");
exports.default = () => {
    const router = (0, express_1.Router)();
    router.use('/authentication', AuthRouter_1.authRouter);
    router.use('/document', DocumentRouter_1.documentRouter);
    router.use('/notifications', NotificationRouter_1.notificationRouter);
    router.use('/configurations', ConfigurationRouter_1.configRouter);
    router.use('/categories', CategoryRouter_1.categoryRouter);
    router.use('/transactions', TransactionRouter_1.transactionRouter);
    router.use('/budgets', BudgetRouter_1.budgetRouter);
    return router;
};
//# sourceMappingURL=index.js.map