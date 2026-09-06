"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const TransactionController_1 = require("../controllers/TransactionController");
exports.transactionRouter = (0, express_1.Router)();
exports.transactionRouter.post("/create", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(TransactionController_1.createTransaction));
exports.transactionRouter.put("/:id/update", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(TransactionController_1.updateTransaction));
exports.transactionRouter.get("/:id", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(TransactionController_1.findTransaction));
exports.transactionRouter.get("", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(TransactionController_1.findAllTransaction));
//# sourceMappingURL=TransactionRouter.js.map