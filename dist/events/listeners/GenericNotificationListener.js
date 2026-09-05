"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericNotificationListener = void 0;
class GenericNotificationListener {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async onBusinessEvent(event) {
        if ("toNotification" in event) {
            const notificationData = event.toNotification();
            await this.notificationService.notifyUser({
                objectId: notificationData.objectId,
                objectType: notificationData.objectType,
                action: notificationData.eventType,
                message: notificationData.message,
                user: notificationData.userId
            });
        }
    }
}
exports.GenericNotificationListener = GenericNotificationListener;
//# sourceMappingURL=GenericNotificationListener.js.map