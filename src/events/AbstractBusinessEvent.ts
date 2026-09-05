import {BusinessCategoryType, BusinessEvent, BusinessEventType, GeneralNotificationData} from "./BusinessEvent";

export abstract class AbstractBusinessEvent<T> implements BusinessEvent<T>{

    constructor(private readonly value: T) {}

    get(): T {
        return this.value
    }

    abstract getAggregateRootId(): number;

    abstract getCategory(): BusinessCategoryType;

    abstract getType(): BusinessEventType;

    abstract toNotification(): GeneralNotificationData;
}