

import { BusinessEvent } from "./BusinessEvent";

export interface BusinessEventListener<T extends BusinessEvent<any>> {
    onBusinessEvent(event: T): Promise<void> | void;
}