"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const CategoryController_1 = require("../controllers/CategoryController");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.post("/create", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(CategoryController_1.createCategory));
exports.categoryRouter.put("/:id/update", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(CategoryController_1.updateCategory));
exports.categoryRouter.delete("/:id/delete", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(CategoryController_1.deleteCategory));
exports.categoryRouter.get("", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(CategoryController_1.findAllCategories));
exports.categoryRouter.get("/:id", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(CategoryController_1.findCategory));
//# sourceMappingURL=CategoryRouter.js.map