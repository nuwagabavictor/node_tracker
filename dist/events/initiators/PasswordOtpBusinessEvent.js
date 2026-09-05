"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordOtpBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class PasswordOtpBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().user.id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.PASSWORD;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.PASSWORD_OTP;
    }
    toNotification() {
        return {
            objectType: BusinessEvent_1.BusinessCategoryType.PASSWORD.toString(),
            message: `${this.get().user.username} Password OTP`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().user.id
        };
    }
}
exports.PasswordOtpBusinessEvent = PasswordOtpBusinessEvent;
//# sourceMappingURL=PasswordOtpBusinessEvent.js.map