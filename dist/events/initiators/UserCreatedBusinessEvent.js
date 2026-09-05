"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class UserCreatedBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.USER;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.USER_CREATED;
    }
    toNotification() {
        return {
            objectType: BusinessEvent_1.BusinessCategoryType.USER.toString(),
            message: `${this.get().username} User Created`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}
exports.UserCreatedBusinessEvent = UserCreatedBusinessEvent;
//# sourceMappingURL=UserCreatedBusinessEvent.js.map