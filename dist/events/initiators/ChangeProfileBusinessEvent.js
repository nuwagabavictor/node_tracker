"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeProfileBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class ChangeProfileBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
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
        return BusinessEvent_1.BusinessEventType.USER_PROFILE_UPDATED;
    }
    toNotification() {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessEvent_1.BusinessCategoryType.USER.toString(),
            message: `${this.get().username} Profile Updated`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}
exports.ChangeProfileBusinessEvent = ChangeProfileBusinessEvent;
//# sourceMappingURL=ChangeProfileBusinessEvent.js.map