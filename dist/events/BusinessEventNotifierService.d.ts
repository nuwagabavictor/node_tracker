import { BusinessEvent } from "./BusinessEvent";
import { BusinessEventListener } from "./BusinessEventListener";
import { GenericBusinessEventListener } from "./GenericBusinessEventListener";
type EventConstructor<T extends BusinessEvent<any>> = new (...args: any[]) => T;
export declare class BusinessEventNotifierService {
    private preListeners;
    private postListeners;
    private genericListeners;
    addPreBusinessEventListener<T extends BusinessEvent<any>>(eventType: EventConstructor<T>, listener: BusinessEventListener<T>): void;
    addPostBusinessEventListener<T extends BusinessEvent<any>>(eventType: EventConstructor<T>, listener: BusinessEventListener<T>): void;
    addGenericBusinessEventListener(listener: GenericBusinessEventListener): void;
    notifyPreBusinessEvent(event: BusinessEvent<any>): Promise<void>;
    notifyPostBusinessEvent(event: BusinessEvent<any>): Promise<void>;
    private notify;
}
export declare const businessEventNotifier: BusinessEventNotifierService;
export {};
//# sourceMappingURL=BusinessEventNotifierService.d.ts.map