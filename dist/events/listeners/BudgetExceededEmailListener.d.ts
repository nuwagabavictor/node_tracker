import { BusinessEventListener } from "../BusinessEventListener";
import { BudgetExceededBusinessEvent } from "../initiators/BudgetExceededBusinessEvent";
export declare class BudgetExceededBusinessEmailListener implements BusinessEventListener<BudgetExceededBusinessEvent> {
    onBusinessEvent(event: BudgetExceededBusinessEvent): Promise<void>;
}
//# sourceMappingURL=BudgetExceededEmailListener.d.ts.map