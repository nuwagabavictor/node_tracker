// core/events/BusinessEventNotifierService.ts

import { BusinessEvent } from "./BusinessEvent";
import { BusinessEventListener } from "./BusinessEventListener";
import { GenericBusinessEventListener } from "./GenericBusinessEventListener";

type EventConstructor<T extends BusinessEvent<any>> = new (...args: any[]) => T;

export class BusinessEventNotifierService {

    private preListeners = new Map<EventConstructor<any>, BusinessEventListener<any>[]>();

    private postListeners = new Map<EventConstructor<any>, BusinessEventListener<any>[]>();

    private genericListeners: GenericBusinessEventListener[] = [];

    addPreBusinessEventListener<T extends BusinessEvent<any>>(
        eventType: EventConstructor<T>,
        listener: BusinessEventListener<T>
    ) {
        const listeners = this.preListeners.get(eventType) ?? [];
        listeners.push(listener);
        this.preListeners.set(eventType, listeners);
    }

    addPostBusinessEventListener<T extends BusinessEvent<any>>(
        eventType: EventConstructor<T>,
        listener: BusinessEventListener<T>
    ) {
        const listeners = this.postListeners.get(eventType) ?? [];
        listeners.push(listener);
        this.postListeners.set(eventType, listeners);
    }

    addGenericBusinessEventListener(listener: GenericBusinessEventListener) {
        this.genericListeners.push(listener);
    }

    async notifyPreBusinessEvent(event: BusinessEvent<any>) {
        await this.notify(event, this.preListeners);
    }

    async notifyPostBusinessEvent(event: BusinessEvent<any>) {
        await this.notify(event, this.postListeners);
    }

    private async notify(
        event: BusinessEvent<any>,
        registry: Map<EventConstructor<any>, BusinessEventListener<any>[]>
    ) {

        const eventClass = event.constructor as EventConstructor<any>;

        const listeners = registry.get(eventClass) ?? [];

        for (const listener of listeners) {
            await listener.onBusinessEvent(event);
        }

        for (const listener of this.genericListeners) {
            await listener.onBusinessEvent(event);
        }
    }
}

export const businessEventNotifier = new BusinessEventNotifierService();