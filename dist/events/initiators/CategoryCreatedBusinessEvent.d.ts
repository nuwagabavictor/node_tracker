import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { Category } from "../../Entities/Category";
import { NotifiableBusinessEvent } from "../NotifiableBusinessEvent";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export declare class CategoryCreatedBusinessEvent extends AbstractBusinessEvent<Category> implements NotifiableBusinessEvent {
    get(): Category;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=CategoryCreatedBusinessEvent.d.ts.map