import { BusinessEventListener } from "../BusinessEventListener";
import { UserSkippedDayBusinessEvent } from "../initiators/UserSkippedDayBusinessEvent";
export declare class UserSkippedDayEmailListener implements BusinessEventListener<UserSkippedDayBusinessEvent> {
    onBusinessEvent(event: UserSkippedDayBusinessEvent): Promise<void>;
}
//# sourceMappingURL=UserSkippedDayEmailListener.d.ts.map