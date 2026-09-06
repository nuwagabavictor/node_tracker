"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoggedInBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class UserLoggedInBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.USER_LOGIN;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.USER;
    }
    getAggregateRootId() {
        return this.get().id;
    }
    toNotification() {
        return {
            objectType: BusinessEvent_1.BusinessCategoryType.USER.toString(),
            objectId: this.getAggregateRootId(),
            message: "You successfully logged in to your account.",
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}
exports.UserLoggedInBusinessEvent = UserLoggedInBusinessEvent;
//# sourceMappingURL=UserLoggedInBusinessEvent.js.map