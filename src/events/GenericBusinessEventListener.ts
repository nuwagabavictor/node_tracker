import {BusinessEvent} from "./BusinessEvent";




export interface GenericBusinessEventListener {
    onBusinessEvent(event: BusinessEvent<any>): Promise<void> | void;
}