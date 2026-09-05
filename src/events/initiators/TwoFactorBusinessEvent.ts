import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";
import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {User} from "../../Entities/User";

export class TwoFactorBusinessEvent extends AbstractBusinessEvent<User>{

    get(): User {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.TWO_FACTOR;
    }

    getType(): BusinessEventType {
        return BusinessEventType.TWO_FACTOR_OTP;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectType: BusinessCategoryType.TWO_FACTOR.toString(),
            message: `${this.get().username} Two Factor OTP`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id

        };
    }
}