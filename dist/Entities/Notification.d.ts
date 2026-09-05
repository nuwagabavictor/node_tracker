import { BaseEntity } from "typeorm";
export declare class Notification extends BaseEntity {
    id: number;
    objectType: string;
    objectId: number;
    action: string;
    message: string;
    isSystemGenerated: boolean;
    userId: number;
    createdAt: Date;
    static createNotification(params: {
        objectId: number;
        objectType: string;
        action: string;
        message: string;
        userId: number;
    }): Notification;
}
//# sourceMappingURL=Notification.d.ts.map