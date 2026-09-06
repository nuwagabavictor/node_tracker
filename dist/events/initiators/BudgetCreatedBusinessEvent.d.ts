import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { Budget } from "../../Entities/Budget";
import { NotifiableBusinessEvent } from "../NotifiableBusinessEvent";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export declare class BudgetCreatedBusinessEvent extends AbstractBusinessEvent<Budget> implements NotifiableBusinessEvent {
    get(): Budget;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=BudgetCreatedBusinessEvent.d.ts.map