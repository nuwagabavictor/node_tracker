"use strict";
// core/events/BusinessEventNotifierService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessEventNotifier = exports.BusinessEventNotifierService = void 0;
class BusinessEventNotifierService {
    preListeners = new Map();
    postListeners = new Map();
    genericListeners = [];
    addPreBusinessEventListener(eventType, listener) {
        const listeners = this.preListeners.get(eventType) ?? [];
        listeners.push(listener);
        this.preListeners.set(eventType, listeners);
    }
    addPostBusinessEventListener(eventType, listener) {
        const listeners = this.postListeners.get(eventType) ?? [];
        listeners.push(listener);
        this.postListeners.set(eventType, listeners);
    }
    addGenericBusinessEventListener(listener) {
        this.genericListeners.push(listener);
    }
    async notifyPreBusinessEvent(event) {
        await this.notify(event, this.preListeners);
    }
    async notifyPostBusinessEvent(event) {
        await this.notify(event, this.postListeners);
    }
    async notify(event, registry) {
        const eventClass = event.constructor;
        const listeners = registry.get(eventClass) ?? [];
        for (const listener of listeners) {
            await listener.onBusinessEvent(event);
        }
        for (const listener of this.genericListeners) {
            await listener.onBusinessEvent(event);
        }
    }
}
exports.BusinessEventNotifierService = BusinessEventNotifierService;
exports.businessEventNotifier = new BusinessEventNotifierService();
//# sourceMappingURL=BusinessEventNotifierService.js.map