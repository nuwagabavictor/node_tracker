import {BusinessEventListener} from "../BusinessEventListener";
import {EmailEvent, emailService} from "../../shared/EmailService";
import {PasswordOtpBusinessEvent} from "../initiators/PasswordOtpBusinessEvent";
import {SmsCategory, smsService} from "../../shared/SmsService";


export class PasswordOtpListener implements BusinessEventListener<PasswordOtpBusinessEvent>{

    async onBusinessEvent(event: PasswordOtpBusinessEvent)
    {
        const otpData = event.get();
        const otp = otpData.otp
        const expiry = otpData.expiryMinutes

        await emailService.sendEmail({
            to: otpData.user.email,
            event: EmailEvent.PASSWORD_OTP,
            data: {
                otp,
                expiry
            }
        })

        await smsService.processSmsOTPCategory(SmsCategory.PASSWORD_RESET, otpData.user.phone,otp)
    }
}