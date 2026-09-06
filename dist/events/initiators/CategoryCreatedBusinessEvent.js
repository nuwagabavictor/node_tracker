"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCreatedBusinessEvent = void 0;
const AbstractBusinessEvent_1 = require("../AbstractBusinessEvent");
const BusinessEvent_1 = require("../BusinessEvent");
class CategoryCreatedBusinessEvent extends AbstractBusinessEvent_1.AbstractBusinessEvent {
    get() {
        return super.get();
    }
    getAggregateRootId() {
        return this.get().id;
    }
    getCategory() {
        return BusinessEvent_1.BusinessCategoryType.CATEGORY;
    }
    getType() {
        return BusinessEvent_1.BusinessEventType.CATEGORY_CREATED;
    }
    toNotification() {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessEvent_1.BusinessCategoryType.CATEGORY.toString(),
            message: `${this.get().name} Category Created`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().userId
        };
    }
}
exports.CategoryCreatedBusinessEvent = CategoryCreatedBusinessEvent;
//# sourceMappingURL=CategoryCreatedBusinessEvent.js.map