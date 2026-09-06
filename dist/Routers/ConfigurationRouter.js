"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const ConfigurationController_1 = require("../controllers/ConfigurationController");
exports.configRouter = (0, express_1.Router)();
exports.configRouter.put("/:id/update", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(ConfigurationController_1.updateConfiguration));
exports.configRouter.get("/:id", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(ConfigurationController_1.findConfiguration));
exports.configRouter.get("", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(ConfigurationController_1.findAllConfigurations));
//# sourceMappingURL=ConfigurationRouter.js.map