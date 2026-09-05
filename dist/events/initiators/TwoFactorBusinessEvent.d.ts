import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { User } from "../../Entities/User";
export declare class TwoFactorBusinessEvent extends AbstractBusinessEvent<User> {
    get(): User;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=TwoFactorBusinessEvent.d.ts.map