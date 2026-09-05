"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordOtpListener = void 0;
const EmailService_1 = require("../../shared/EmailService");
const SmsService_1 = require("../../shared/SmsService");
class PasswordOtpListener {
    async onBusinessEvent(event) {
        const otpData = event.get();
        const otp = otpData.otp;
        const expiry = otpData.expiryMinutes;
        await EmailService_1.emailService.sendEmail({
            to: otpData.user.email,
            event: EmailService_1.EmailEvent.PASSWORD_OTP,
            data: {
                otp,
                expiry
            }
        });
        await SmsService_1.smsService.processSmsOTPCategory(SmsService_1.SmsCategory.PASSWORD_RESET, otpData.user.phone, otp);
    }
}
exports.PasswordOtpListener = PasswordOtpListener;
//# sourceMappingURL=PasswordOtpListener.js.map