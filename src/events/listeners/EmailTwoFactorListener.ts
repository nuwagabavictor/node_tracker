import {BusinessEventListener} from "../BusinessEventListener";
import {TwoFactorBusinessEvent} from "../initiators/TwoFactorBusinessEvent";
import {EmailEvent, emailService} from "../../shared/EmailService";
import {generateTwoFactorToken} from "../../Middleware/AuthMiddleware";
import {SmsCategory, smsService} from "../../shared/SmsService";

export class EmailTwoFactorListener implements BusinessEventListener<TwoFactorBusinessEvent>{

    async onBusinessEvent(event: TwoFactorBusinessEvent) {

        const user = event.get();
        const otp = await generateTwoFactorToken(user);

        await emailService.sendEmail({
            to: user.email,
            event: EmailEvent.TWOFACTOR_OTP,
            data: {
                otp,
                expiryMinutes: 5
            }
        })

        await smsService.processSmsOTPCategory(SmsCategory.TWO_FACTOR_OTP,user.phone,otp)

    }
}