"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
exports.getUnreadNotifications = getUnreadNotifications;
exports.getUnreadNotificationCount = getUnreadNotificationCount;
exports.markNotificationAsRead = markNotificationAsRead;
exports.getNotification = getNotification;
exports.markAllNotificationsAsRead = markAllNotificationsAsRead;
const NotificationService_1 = require("../shared/NotificationService");
const notificationService = new NotificationService_1.NotificationService();
async function getNotifications(req, res, next) {
    try {
        const userId = req.user.id;
        const notifications = await notificationService.getAllNotifications(userId);
        const response = notifications.map(notification => ({
            id: notification.id,
            notificationId: notification.notificationId,
            userId: notification.userId,
            isRead: notification.isRead,
            createdAt: notification.createdAt,
            notification: {
                id: notification.notification.id,
                message: notification.notification.message,
                entity: notification.notification.objectType,
                action: notification.notification.action,
                entityId: notification.notification.objectId,
            }
        }));
        res.status(200).json({ notifications: response });
    }
    catch (e) {
        next(e);
    }
}
async function getUnreadNotifications(req, res, next) {
    try {
        const userId = req.user.id;
        const notifications = await notificationService.getUnreadNotifications(userId);
        const data = notifications.map(notification => ({
            id: notification.id,
            notificationId: notification.notificationId,
            userId: notification.userId,
            isRead: notification.isRead,
            createdAt: notification.createdAt,
            notification: {
                id: notification.notification.id,
                message: notification.notification.message,
                entity: notification.notification.objectType,
                action: notification.notification.action,
                entityId: notification.notification.objectId,
            }
        }));
        res.status(200).json({
            notifications: data
        });
    }
    catch (e) {
        next(e);
    }
}
async function getUnreadNotificationCount(req, res, next) {
    try {
        const userId = req.user.id;
        const count = await notificationService.getUnreadNotificationCount(userId);
        res.status(200).json({
            count
        });
    }
    catch (e) {
        next(e);
    }
}
async function markNotificationAsRead(req, res, next) {
    try {
        const userId = req.user.id;
        const notificationId = Number(req.params.notificationId);
        if (Number.isNaN(notificationId)) {
            return res.status(400).json({
                message: "Invalid notification ID"
            });
        }
        await notificationService.markAsRead(userId, notificationId);
        res.status(200).json({
            message: "Notification marked as read"
        });
    }
    catch (e) {
        next(e);
    }
}
async function getNotification(req, res, next) {
    try {
        const userId = req.user.id;
        const notificationId = Number(req.params.id);
        if (Number.isNaN(notificationId)) {
            return res.status(400).json({
                message: "Invalid notification ID"
            });
        }
        const notification = await notificationService.getNotification(userId, notificationId);
        const data = {
            id: notification.id,
            notificationId: notification.notificationId,
            userId: notification.userId,
            isRead: notification.isRead,
            createdAt: notification.createdAt,
            notification: {
                id: notification.notification.id,
                message: notification.notification.message,
                entity: notification.notification.objectType,
                action: notification.notification.action,
                entityId: notification.notification.objectId,
            }
        };
        res.status(200).json({
            notification: data
        });
    }
    catch (e) {
        next(e);
    }
}
async function markAllNotificationsAsRead(req, res, next) {
    try {
        const userId = req.user.id;
        await notificationService.markAllAsRead(userId);
        res.status(200).json({
            message: "All notifications marked as read"
        });
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=NotificationController.js.map