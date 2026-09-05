"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTwoFactorListener = void 0;
const EmailService_1 = require("../../shared/EmailService");
const AuthMiddleware_1 = require("../../Middleware/AuthMiddleware");
const SmsService_1 = require("../../shared/SmsService");
class EmailTwoFactorListener {
    async onBusinessEvent(event) {
        const user = event.get();
        const otp = await (0, AuthMiddleware_1.generateTwoFactorToken)(user);
        await EmailService_1.emailService.sendEmail({
            to: user.email,
            event: EmailService_1.EmailEvent.TWOFACTOR_OTP,
            data: {
                otp,
                expiryMinutes: 5
            }
        });
        await SmsService_1.smsService.processSmsOTPCategory(SmsService_1.SmsCategory.TWO_FACTOR_OTP, user.phone, otp);
    }
}
exports.EmailTwoFactorListener = EmailTwoFactorListener;
//# sourceMappingURL=EmailTwoFactorListener.js.map