import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { User } from "../../Entities/User";
import { NotifiableBusinessEvent } from "../NotifiableBusinessEvent";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export declare class UserLoggedInBusinessEvent extends AbstractBusinessEvent<User> implements NotifiableBusinessEvent {
    get(): User;
    getType(): BusinessEventType;
    getCategory(): BusinessCategoryType;
    getAggregateRootId(): number;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=UserLoggedInBusinessEvent.d.ts.map