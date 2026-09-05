"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeListener = void 0;
const EmailService_1 = require("../../shared/EmailService");
class PasswordChangeListener {
    async onBusinessEvent(event) {
        const user = event.get();
        await EmailService_1.emailService.sendEmail({
            to: user.email,
            event: EmailService_1.EmailEvent.PASSWORD_CHANGED,
            data: {}
        });
    }
}
exports.PasswordChangeListener = PasswordChangeListener;
//# sourceMappingURL=PasswordChangeListener.js.map