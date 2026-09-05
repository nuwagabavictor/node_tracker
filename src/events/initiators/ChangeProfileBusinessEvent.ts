import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {User} from "../../Entities/User";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export class ChangeProfileBusinessEvent extends AbstractBusinessEvent<User> implements NotifiableBusinessEvent{

    get(): User {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.USER;
    }

    getType(): BusinessEventType {
        return BusinessEventType.USER_PROFILE_UPDATED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessCategoryType.USER.toString(),
            message: `${this.get().username} Profile Updated`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}