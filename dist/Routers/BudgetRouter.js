"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const BudgetController_1 = require("../controllers/BudgetController");
exports.budgetRouter = (0, express_1.Router)();
exports.budgetRouter.post("/create", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(BudgetController_1.createBudget));
exports.budgetRouter.put("/:id/update", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(BudgetController_1.updateBudget));
exports.budgetRouter.get("/:id", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(BudgetController_1.findBudget));
exports.budgetRouter.get("", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(BudgetController_1.findAllBudgets));
//# sourceMappingURL=BudgetRouter.js.map