"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRegisterListener = void 0;
const EmailService_1 = require("../../shared/EmailService");
class EmailRegisterListener {
    async onBusinessEvent(event) {
        const user = event.get();
        await EmailService_1.emailService.sendEmail({
            to: user.email,
            event: EmailService_1.EmailEvent.WELCOME,
            data: {
                username: user.username
            }
        });
    }
}
exports.EmailRegisterListener = EmailRegisterListener;
//# sourceMappingURL=EmailRegisterListener.js.map