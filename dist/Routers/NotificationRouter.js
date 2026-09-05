"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const asyncHandler_1 = require("../Middleware/asyncHandler");
const NotificationController_1 = require("../controllers/NotificationController");
exports.notificationRouter = (0, express_1.Router)();
exports.notificationRouter.get("", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(NotificationController_1.getNotifications));
exports.notificationRouter.get("/count", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(NotificationController_1.getUnreadNotificationCount));
exports.notificationRouter.get("/unread", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(NotificationController_1.getUnreadNotifications));
exports.notificationRouter.put("/:notificationId/read", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(NotificationController_1.markNotificationAsRead));
exports.notificationRouter.put("/read-all", AuthMiddleware_1.authenticate, (0, asyncHandler_1.asyncHandler)(NotificationController_1.markAllNotificationsAsRead));
//# sourceMappingURL=NotificationRouter.js.map