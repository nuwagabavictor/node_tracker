import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {Transaction} from "../../Entities/Transaction";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export class TransactionCreatedBusinessEvent extends AbstractBusinessEvent<Transaction> implements NotifiableBusinessEvent{

    get(): Transaction {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.TRANSACTION;
    }

    getType(): BusinessEventType {
        return BusinessEventType.TRANSACTION_CREATED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessCategoryType.TRANSACTION.toString(),
            message: `${this.get().description} Transaction Created`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().userId
        };
    }
}