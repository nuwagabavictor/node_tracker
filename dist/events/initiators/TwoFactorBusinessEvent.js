"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorBusinessEvent = void 0;
const BusinessEvent_1 = require("../BusinessEvent");
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
class TwoFactorBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.TWO_FACTOR;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.TWO_FACTOR_OTP;
    }
    toNotification() {
        return {
            objectType: BusinessEvent_1.BusinessCategoryType.TWO_FACTOR.toString(),
            message: `${this.get().username} Two Factor OTP`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().id
        };
    }
}
exports.TwoFactorBusinessEvent = TwoFactorBusinessEvent;
//# sourceMappingURL=TwoFactorBusinessEvent.js.map