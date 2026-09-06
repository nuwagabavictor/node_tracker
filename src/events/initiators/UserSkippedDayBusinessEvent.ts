import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export type UserData ={
    id:number,
    username:string,
    email:string,
}

export class UserSkippedDayBusinessEvent extends AbstractBusinessEvent<UserData> implements NotifiableBusinessEvent{

    get(): UserData {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.TRANSACTION;
    }

    getType(): BusinessEventType {
        return BusinessEventType.DAY_SKIPPED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessCategoryType.TRANSACTION.toString(),
            message: `${this.get().username} No Expenses/Income Entered Today`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}