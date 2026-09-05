import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {User} from "../../Entities/User";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export class PasswordChangeBusinessEvent extends AbstractBusinessEvent<User>{

    get(): User {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getType(): BusinessEventType {
        return BusinessEventType.PASSWORD_CHANGED;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.PASSWORD;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectType: BusinessCategoryType.PASSWORD.toString(),
            message: `${this.get().username} Password Changed`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }

}