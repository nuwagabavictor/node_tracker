import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {Budget} from "../../Entities/Budget";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export class BudgetCreatedBusinessEvent extends AbstractBusinessEvent<Budget> implements NotifiableBusinessEvent{

    get(): Budget {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.BUDGET;
    }

    getType(): BusinessEventType {
        return BusinessEventType.BUDGET_CREATED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessCategoryType.BUDGET.toString(),
            message: `${this.get().period} Budget Created`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().userId
        };
    }
}