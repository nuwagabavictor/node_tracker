import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {User} from "../../Entities/User";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";


export class UserCreatedBusinessEvent extends AbstractBusinessEvent<User>{


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
        return BusinessEventType.USER_CREATED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectType: BusinessCategoryType.USER.toString(),
            message: `${this.get().username} User Created`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id

        };
    }
}