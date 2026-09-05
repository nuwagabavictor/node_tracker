import { BusinessEventListener } from "../BusinessEventListener";
import { UserCreatedBusinessEvent } from "../initiators/UserCreatedBusinessEvent";
export declare class EmailRegisterListener implements BusinessEventListener<UserCreatedBusinessEvent> {
    onBusinessEvent(event: UserCreatedBusinessEvent): Promise<void>;
}
//# sourceMappingURL=EmailRegisterListener.d.ts.map