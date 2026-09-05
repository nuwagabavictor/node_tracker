import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { User } from "../../Entities/User";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export declare class PasswordChangeBusinessEvent extends AbstractBusinessEvent<User> {
    get(): User;
    getAggregateRootId(): number;
    getType(): BusinessEventType;
    getCategory(): BusinessCategoryType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=PasswordChangeBusinessEvent.d.ts.map