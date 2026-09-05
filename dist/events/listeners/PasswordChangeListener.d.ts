import { BusinessEventListener } from "../BusinessEventListener";
import { PasswordChangeBusinessEvent } from "../initiators/PasswordChangeBusinessEvent";
export declare class PasswordChangeListener implements BusinessEventListener<PasswordChangeBusinessEvent> {
    onBusinessEvent(event: PasswordChangeBusinessEvent): Promise<void>;
}
//# sourceMappingURL=PasswordChangeListener.d.ts.map