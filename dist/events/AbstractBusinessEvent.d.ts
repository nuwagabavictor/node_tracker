import { BusinessCategoryType, BusinessEvent, BusinessEventType, GeneralNotificationData } from "./BusinessEvent";
export declare abstract class AbstractBusinessEvent<T> implements BusinessEvent<T> {
    private readonly value;
    constructor(value: T);
    get(): T;
    abstract getAggregateRootId(): number;
    abstract getCategory(): BusinessCategoryType;
    abstract getType(): BusinessEventType;
    abstract toNotification(): GeneralNotificationData;
}
//# sourceMappingURL=AbstractBusinessEvent.d.ts.map