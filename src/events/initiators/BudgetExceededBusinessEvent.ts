import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {Budget} from "../../Entities/Budget";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export type BudgetData ={
    budget:Budget,
    amountSpent:number,
    exceededBy:number,
}

export class BudgetExceededBusinessEvent extends AbstractBusinessEvent<BudgetData> implements NotifiableBusinessEvent{

    get(): BudgetData {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().budget.id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.BUDGET;
    }

    getType(): BusinessEventType {
        return BusinessEventType.BUDGET_EXCEEDED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessCategoryType.BUDGET.toString(),
            message: `Budget Exceeded`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().budget.userId
        };
    }
}