"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSkippedDayEmailListener = void 0;
const EmailService_1 = require("../../shared/EmailService");
class UserSkippedDayEmailListener {
    async onBusinessEvent(event) {
        const user = event.get();
        await EmailService_1.emailService.sendEmail({
            to: user.email,
            event: EmailService_1.EmailEvent.DAILY_REMINDER,
            data: {
                username: user.username,
            }
        });
    }
}
exports.UserSkippedDayEmailListener = UserSkippedDayEmailListener;
//# sourceMappingURL=UserSkippedDayEmailListener.js.map