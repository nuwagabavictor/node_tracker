"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const UserController_1 = require("../controllers/UserController");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/register', (0, asyncHandler_1.asyncHandler)(UserController_1.registerHandler));
exports.authRouter.post('/login', (0, asyncHandler_1.asyncHandler)(UserController_1.loginHandler));
exports.authRouter.get('/token', (0, asyncHandler_1.asyncHandler)(UserController_1.refreshHandler));
exports.authRouter.post('/twofactor', (0, asyncHandler_1.asyncHandler)(UserController_1.twoFactorHandler));
exports.authRouter.post('change-password/:id', AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(UserController_1.changePassword));
exports.authRouter.post('/password-token', (0, asyncHandler_1.asyncHandler)(UserController_1.requestPasswordOtp));
exports.authRouter.post("change-password", (0, asyncHandler_1.asyncHandler)(UserController_1.requestPasswordChange));
exports.authRouter.post("/change-profile", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(UserController_1.changeProfile));
//# sourceMappingURL=AuthRouter.js.map