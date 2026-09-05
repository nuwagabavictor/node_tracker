import { GenericBusinessEventListener } from "../GenericBusinessEventListener";
import { NotificationService } from "../../shared/NotificationService";
import { BusinessEvent } from "../BusinessEvent";
export declare class GenericNotificationListener implements GenericBusinessEventListener {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    onBusinessEvent(event: BusinessEvent<any>): Promise<void>;
}
//# sourceMappingURL=GenericNotificationListener.d.ts.map