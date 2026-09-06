
export enum BusinessEventType {
    USER_CREATED = "USER_CREATED",
    USER_UPDATED = "USER_UPDATED",
    USER_DELETED = "USER_DELETED",
    TWO_FACTOR_OTP = "TWO_FACTOR_OTP",
    PASSWORD_RESET = "PASSWORD_RESET",
    PASSWORD_CHANGED = "PASSWORD_CHANGED",
    PASSWORD_OTP = "PASSWORD_OTP",
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    USER_LOCKED = "USER_LOCKED",
    USER_ACTIVATED = "USER_ACTIVATED",
    USER_PROFILE_UPDATED = "USER_PROFILE_UPDATED",
    USER_PROFILE_DELETED = "USER_PROFILE_DELETED",
    USER_PROFILE_CREATED = "USER_PROFILE_CREATED",
    USER_PROFILE_PASSWORD_CHANGED = "USER_PROFILE_PASSWORD_CHANGED",
    USER_PROFILE_TWO_FACTOR_ENABLED = "USER_PROFILE_TWO_FACTOR_ENABLED",
    USER_PROFILE_TWO_FACTOR_DISABLED = "USER_PROFILE_TWO_FACTOR_DISABLED",
    DAY_SKIPPED = "DAY_SKIPPED",
    BUDGET_CREATED = "BUDGET_CREATED",
    BUDGET_UPDATED = "BUDGET_UPDATED",
    TRANSACTION_CREATED = "TRANSACTION_CREATED",
    TRANSACTION_UPDATED = "TRANSACTION_UPDATED",
    BUDGET_EXCEEDED = "BUDGET_EXCEEDED",
    CATEGORY_CREATED = "CATEGORY_CREATED",
}

export enum BusinessCategoryType {
    USER = "USER",
    TWO_FACTOR = "TWO_FACTOR",
    PASSWORD = "PASSWORD",
    TRANSACTION = "TRANSACTION",
    BUDGET = "BUDGET",
    GLOBAL_CONFIGURATION = "GLOBAL_CONFIGURATION",
    CATEGORY = "CATEGORY",
}

export type GeneralNotificationData = {
     objectType: string,
     message: string,
     eventType: BusinessEventType,
     objectId: number,
     category: BusinessCategoryType,
     timestamp: Date,
     userId: number,
}

export interface BusinessEvent<T> {

    /**
     * The business object associated with this event.
     * Example: User, Loan, Payment, Transaction...
     */
    get(): T;

    /**
     * Event name.
     */
    getType(): BusinessEventType;

    /**
     * Event category.
     */
    getCategory(): BusinessCategoryType;

    /**
     * ID of the entity that triggered the event.
     */
    getAggregateRootId(): number;

    /**
     * Convert event into notification payload.
     */
    toNotification(): GeneralNotificationData;
}