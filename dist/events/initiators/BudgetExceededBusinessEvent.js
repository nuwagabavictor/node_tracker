"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetExceededBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class BudgetExceededBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().budget.id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.BUDGET;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.BUDGET_EXCEEDED;
    }
    toNotification() {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessEvent_1.BusinessCategoryType.BUDGET.toString(),
            message: `Budget Exceeded`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().budget.userId
        };
    }
}
exports.BudgetExceededBusinessEvent = BudgetExceededBusinessEvent;
//# sourceMappingURL=BudgetExceededBusinessEvent.js.map