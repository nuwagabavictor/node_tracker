import { AbstractBusinessEvent } from "../AbstractBusinessEvent";
import { User } from "../../Entities/User";
import { BusinessCategoryType, BusinessEventType, GeneralNotificationData } from "../BusinessEvent";
export type PasswordOtpData = {
    otp: string;
    user: User;
    expiryMinutes: number;
};
export declare class PasswordOtpBusinessEvent extends AbstractBusinessEvent<PasswordOtpData> {
    get(): PasswordOtpData;
    getAggregateRootId(): number;
    getCategory(): BusinessCategoryType;
    getType(): BusinessEventType;
    toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=PasswordOtpBusinessEvent.d.ts.map