import { BusinessEventListener } from "../BusinessEventListener";
import { PasswordOtpBusinessEvent } from "../initiators/PasswordOtpBusinessEvent";
export declare class PasswordOtpListener implements BusinessEventListener<PasswordOtpBusinessEvent> {
    onBusinessEvent(event: PasswordOtpBusinessEvent): Promise<void>;
}
//# sourceMappingURL=PasswordOtpListener.d.ts.map