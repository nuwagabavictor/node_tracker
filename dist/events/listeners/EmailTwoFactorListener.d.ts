import { BusinessEventListener } from "../BusinessEventListener";
import { TwoFactorBusinessEvent } from "../initiators/TwoFactorBusinessEvent";
export declare class EmailTwoFactorListener implements BusinessEventListener<TwoFactorBusinessEvent> {
    onBusinessEvent(event: TwoFactorBusinessEvent): Promise<void>;
}
//# sourceMappingURL=EmailTwoFactorListener.d.ts.map