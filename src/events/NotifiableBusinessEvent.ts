import {GeneralNotificationData} from "./BusinessEvent";

export interface NotifiableBusinessEvent {
    toNotification(): GeneralNotificationData;
}