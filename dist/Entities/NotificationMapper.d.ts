import { BaseEntity } from "typeorm";
import { Notification } from "./Notification";
import { User } from "./User";
export declare class NotificationMapper extends BaseEntity {
    id: number;
    notification: Notification;
    notificationId: number;
    user: User;
    userId: number;
    isRead: boolean;
    createdAt: Date;
    static createNotificationMapper(params: {
        notification: Notification;
        user: User;
    }): NotificationMapper;
}
//# sourceMappingURL=NotificationMapper.d.ts.map