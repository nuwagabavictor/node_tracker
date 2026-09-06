import {BusinessEventListener} from "../BusinessEventListener";
import {EmailEvent, emailService} from "../../shared/EmailService";
import {BudgetExceededBusinessEvent} from "../initiators/BudgetExceededBusinessEvent";

export class BudgetExceededBusinessEmailListener implements BusinessEventListener<BudgetExceededBusinessEvent>{

    async onBusinessEvent(event: BudgetExceededBusinessEvent) {

        const budget = event.get();
        await emailService.sendEmail({
            to: budget.budget.user.email,
            event: EmailEvent.BUDGET_EXCEEDED,
            data: {
                budget: budget.budget,
                amountSpent: budget.amountSpent,
                exceededBy: budget.exceededBy
            }
        })
    }

}