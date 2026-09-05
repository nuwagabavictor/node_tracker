"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class PasswordChangeBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().id;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.PASSWORD_CHANGED;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.PASSWORD;
    }
    toNotification() {
        return {
            objectType: BusinessEvent_1.BusinessCategoryType.PASSWORD.toString(),
            message: `${this.get().username} Password Changed`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}
exports.PasswordChangeBusinessEvent = PasswordChangeBusinessEvent;
//# sourceMappingURL=PasswordChangeBusinessEvent.js.map