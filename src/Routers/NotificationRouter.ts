import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {
    getNotification,
    getNotifications,
    getUnreadNotificationCount,
    getUnreadNotifications, markAllNotificationsAsRead, markNotificationAsRead
} from "../controllers/NotificationController";

export const notificationRouter = Router();

notificationRouter.get("/count", authenticate, asyncHandler(getUnreadNotificationCount))
notificationRouter.get("/unread", authenticate, asyncHandler(getUnreadNotifications))
notificationRouter.put("/read-all", authenticate, asyncHandler(markAllNotificationsAsRead));
notificationRouter.get("/:id", authenticate, asyncHandler(getNotification));
notificationRouter.put("/:notificationId/read", authenticate, asyncHandler(markNotificationAsRead));
notificationRouter.get("", authenticate, asyncHandler(getNotifications))

