import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { Budget } from "../../Entities/Budget";
import { NotifiableBusinessEvent } from "../NotifiableBusinessEvent";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export type BudgetData = {
    budget: Budget;
    amountSpent: number;
    exceededBy: number;
};
export declare class BudgetExceededBusinessEvent extends AbstractBusinessEvent<BudgetData> implements NotifiableBusinessEvent {
    get(): BudgetData;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=BudgetExceededBusinessEvent.d.ts.map