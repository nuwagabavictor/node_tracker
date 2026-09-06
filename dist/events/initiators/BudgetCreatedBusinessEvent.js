"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetCreatedBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class BudgetCreatedBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.BUDGET;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.BUDGET_CREATED;
    }
    toNotification() {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessEvent_1.BusinessCategoryType.BUDGET.toString(),
            message: `${this.get().period} Budget Created`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().userId
        };
    }
}
exports.BudgetCreatedBusinessEvent = BudgetCreatedBusinessEvent;
//# sourceMappingURL=BudgetCreatedBusinessEvent.js.map