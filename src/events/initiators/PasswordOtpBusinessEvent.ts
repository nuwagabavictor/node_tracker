import {AbstractBusinessEvent} from "../AbstractBusinessEvent";
import {User} from "../../Entities/User";
import {BusinessCategoryType, BusinessEventType, GeneralNotificationData} from "../BusinessEvent";

export type PasswordOtpData = {
    otp: string;
    user: User;
    expiryMinutes: number
}

export class PasswordOtpBusinessEvent extends AbstractBusinessEvent<PasswordOtpData>{


    get(): PasswordOtpData {
        return super.get();
    }

    getAggregateRootId(): number {
        return this.get().user.id;
    }

    getCategory(): BusinessCategoryType {
        return BusinessCategoryType.PASSWORD;
    }

    getType(): BusinessEventType {
        return BusinessEventType.PASSWORD_OTP;
    }

    toNotification(): GeneralNotificationData {
        return {
            objectType: BusinessCategoryType.PASSWORD.toString(),
            message: `${this.get().user.username} Password OTP`,
            objectId: this.getAggregateRootId(),
            eventType: this.getType(),
            category: this.getCategory(),
            timestamp: new Date(),
            userId: this.get().user.id

        };
    }
}