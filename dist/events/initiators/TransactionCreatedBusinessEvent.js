"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCreatedBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class TransactionCreatedBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
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
        return BusinessEvent_1.BusinessEventType.TRANSACTION_CREATED;
    }
    toNotification() {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessEvent_1.BusinessCategoryType.TRANSACTION.toString(),
            message: `${this.get().description} Transaction Created`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().userId
        };
    }
}
exports.TransactionCreatedBusinessEvent = TransactionCreatedBusinessEvent;
//# sourceMappingURL=TransactionCreatedBusinessEvent.js.map