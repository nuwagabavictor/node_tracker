"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetExceededBusinessEmailListener = void 0;
const EmailService_1 = require("../../shared/EmailService");
class BudgetExceededBusinessEmailListener {
    async onBusinessEvent(event) {
        const budget = event.get();
        await EmailService_1.emailService.sendEmail({
            to: budget.budget.user.email,
            event: EmailService_1.EmailEvent.BUDGET_EXCEEDED,
            data: {
                budget: budget.budget,
                amountSpent: budget.amountSpent,
                exceededBy: budget.exceededBy
            }
        });
    }
}
exports.BudgetExceededBusinessEmailListener = BudgetExceededBusinessEmailListener;
//# sourceMappingURL=BudgetExceededEmailListener.js.map