import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import {User} from "../../Entities/User";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";



export class UserLoggedInBusinessEvent extends AbstractBusinessEvent<User> implements NotifiableBusinessEvent {


    get(): User {
        return super.get();
    }

    getType(): BusinessEventType {
        return BusinessEventType.USER_LOGIN;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.USER;
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectType: "User",
            objectId: this.getAggregateRootId(),
            message: "You successfully logged in to your account.",
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}