import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {Category} from "../../Entities/Category";
import {NotifiableBusinessEvent} from "../NotifiableBusinessEvent";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export class CategoryCreatedBusinessEvent extends AbstractBusinessEvent<Category> implements NotifiableBusinessEvent{

    get(): Category {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.CATEGORY;
    }

    getType(): BusinessEventType {
        return BusinessEventType.CATEGORY_CREATED;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectId: this.getAggregateRootId(),
            objectType: BusinessCategoryType.CATEGORY.toString(),
            message: `${this.get().name} Category Created`,
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().userId
        };
    }
}