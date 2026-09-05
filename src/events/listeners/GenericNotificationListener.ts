import {GenericBusinessEventListener} from "../GenericBusinessEventListener";
import {NotificationService} from "../../shared/NotificationService";
import {BusinessEvent} from "../BusinessEvent";

export class GenericNotificationListener implements GenericBusinessEventListener{

    constructor(private readonly notificationService:NotificationService) {
    }

    async onBusinessEvent(event: BusinessEvent<any>) {
        if ("toNotification" in event) {

            const notificationData =
                event.toNotification();

            await this.notificationService.notifyUser({
                    objectId: notificationData.objectId,
                    objectType: notificationData.objectType,
                    action:notificationData.eventType,
                    message:notificationData.message,
                    user:notificationData.userId
                }
            );
        }
    }


}