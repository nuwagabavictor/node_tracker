import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { Transaction } from "../../Entities/Transaction";
import { NotifiableBusinessEvent } from "../NotifiableBusinessEvent";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export declare class TransactionCreatedBusinessEvent extends AbstractBusinessEvent<Transaction> implements NotifiableBusinessEvent {
    get(): Transaction;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=TransactionCreatedBusinessEvent.d.ts.map