"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const Notification_1 = require("../Entities/Notification");
const User_1 = require("../Entities/User");
const NotificationMapper_1 = require("../Entities/NotificationMapper");
const database_1 = require("../Database/database");
class NotificationService {
    async createNotification(data, manager) {
        const notification = Notification_1.Notification.createNotification({
            objectId: data.objectId,
            objectType: data.objectType,
            action: data.action,
            message: data.message,
            userId: data.user
        });
        await manager.save(Notification_1.Notification, notification);
        return notification.id;
    }
    async insertToMapper(userId, notificationId, manager) {
        const user = await manager.findOne(User_1.User, { where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        const notification = await manager.findOne(Notification_1.Notification, { where: { id: notificationId } });
        if (!notification) {
            throw new Error("Notification not found");
        }
        const mapper = NotificationMapper_1.NotificationMapper.createNotificationMapper({ notification: notification, user: user });
        await manager.save(NotificationMapper_1.NotificationMapper, mapper);
    }
    async notifyUser(notification) {
        await database_1.AppDataSource.transaction(async (manager) => {
            const id = await this.createNotification(notification, manager);
            await this.insertToMapper(notification.user, id, manager);
        });
    }
    async getAllNotifications(userId) {
        return await NotificationMapper_1.NotificationMapper.find({
            where: {
                userId: userId
            },
            relations: {
                notification: true,
                user: true
            },
            order: {
                id: "DESC"
            }
        });
    }
    async getUnreadNotifications(userId) {
        return await NotificationMapper_1.NotificationMapper.find({
            where: {
                userId: userId,
                isRead: false
            },
            relations: {
                notification: true
            },
            order: {
                id: "DESC"
            }
        });
    }
    async getUnreadNotificationCount(userId) {
        return await NotificationMapper_1.NotificationMapper.count({
            where: {
                userId: userId,
                isRead: false
            }
        });
    }
    async markAsRead(userId, notificationId) {
        const notificationMapper = await NotificationMapper_1.NotificationMapper.findOne({
            where: {
                userId: userId,
                notificationId: notificationId
            }
        });
        if (!notificationMapper) {
            throw new Error("Notification not found");
        }
        notificationMapper.isRead = true;
        await notificationMapper.save();
    }
    async markAllAsRead(userId) {
        await NotificationMapper_1.NotificationMapper.update({
            userId: userId,
            isRead: false
        }, {
            isRead: true
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map