import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { NotifiableBusinessEvent } from "../NotifiableBusinessEvent";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export type UserData = {
    id: number;
    username: string;
    email: string;
};
export declare class UserSkippedDayBusinessEvent extends AbstractBusinessEvent<UserData> implements NotifiableBusinessEvent {
    get(): UserData;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=UserSkippedDayBusinessEvent.d.ts.map