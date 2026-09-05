import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { User } from "../../Entities/User";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export declare class UserCreatedBusinessEvent extends AbstractBusinessEvent<User> {
    get(): User;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=UserCreatedBusinessEvent.d.ts.map