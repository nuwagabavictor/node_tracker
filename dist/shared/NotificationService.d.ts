import { NotificationMapper } from "../Entities/NotificationMapper";
import { EntityManager } from "typeorm";
export type NotificationData = {
    objectId: number;
    objectType: string;
    action: string;
    user: number;
    message: string;
};
export declare class NotificationService {
    createNotification(data: NotificationData, manager: EntityManager): Promise<number>;
    insertToMapper(userId: number, notificationId: number, manager: EntityManager): Promise<void>;
    notifyUser(notification: NotificationData): Promise<void>;
    getAllNotifications(userId: number): Promise<NotificationMapper[]>;
    getUnreadNotifications(userId: number): Promise<NotificationMapper[]>;
    getUnreadNotificationCount(userId: number): Promise<number>;
    markAsRead(userId: number, notificationId: number): Promise<void>;
    markAllAsRead(userId: number): Promise<void>;
}
//# sourceMappingURL=NotificationService.d.ts.map