import {Notification} from "../Entities/Notification";
import {User} from "../Entities/User";
import {NotificationMapper} from "../Entities/NotificationMapper";
import {EntityManager} from "typeorm";
import {AppDataSource} from "../Database/database";
import {BusinessCategoryType, BusinessEventType} from "../events/BusinessEvent";

export type NotificationData={
    objectId: number,
    objectType: string,
    action: string,
    user: number,
    message: string,
}

export class NotificationService {

    async createNotification(data: NotificationData, manager:EntityManager):Promise<number> {

        const notification = Notification.createNotification(
            {
                objectId: data.objectId,
                objectType: data.objectType,
                action: data.action,
                message: data.message,
                userId: data.user
            }
        )

        await manager.save(Notification,notification)

        return notification.id
    }

    async insertToMapper(userId: number, notificationId: number, manager:EntityManager) {

        const user = await manager.findOne(User,{where: {id: userId}})

        if (!user){
            throw new Error("User not found")
        }

        const notification = await manager.findOne(Notification,{where: {id: notificationId}})

        if (!notification){
            throw new Error("Notification not found")
        }

        const mapper = NotificationMapper.createNotificationMapper({notification:notification, user:user});
        await manager.save(NotificationMapper,mapper)
    }


    async notifyUser(notification: NotificationData) {
        await AppDataSource.transaction(async (manager) => {
            const id = await this.createNotification(notification, manager)
            await this.insertToMapper(notification.user, id,manager)
        })

    }

    async getAllNotifications(userId: number){

        return await NotificationMapper.find({
            where: {
                userId: userId
            },
            relations: {
                notification: true,
                user:true
            },
            order: {
                id: "DESC"
            }
        });

    }

    async getUnreadNotifications(userId: number) {

        return await NotificationMapper.find({
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

    async getUnreadNotificationCount(userId: number): Promise<number> {

        return await NotificationMapper.count({
            where: {
                userId: userId,
                isRead: false
            }
        });
    }

    async markAsRead(userId: number, notificationId: number): Promise<void> {

        const notificationMapper = await NotificationMapper.findOne({
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

    async markAllAsRead(userId: number): Promise<void> {

        await NotificationMapper.update(
            {
                userId: userId,
                isRead: false
            },
            {
                isRead: true
            }
        );
    }
}