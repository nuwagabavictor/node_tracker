"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSkippedDayBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class UserSkippedDayBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.TRANSACTION;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.DAY_SKIPPED;
    }
    toNotification() {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessEvent_1.BusinessCategoryType.TRANSACTION.toString(),
            message: `${this.get().username} No Expenses/Income Entered Today`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}
exports.UserSkippedDayBusinessEvent = UserSkippedDayBusinessEvent;
//# sourceMappingURL=UserSkippedDayBusinessEvent.js.map