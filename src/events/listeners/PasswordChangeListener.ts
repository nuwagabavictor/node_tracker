import {BusinessEventListener} from "../BusinessEventListener";
import {PasswordChangeBusinessEvent} from "../initiators/PasswordChangeBusinessEvent";
import {EmailEvent, emailService} from "../../shared/EmailService";

export class PasswordChangeListener implements BusinessEventListener<PasswordChangeBusinessEvent>{

    async onBusinessEvent(event: PasswordChangeBusinessEvent)
    {
        const user = event.get();
        await emailService.sendEmail({
            to: user.email,
            event: EmailEvent.PASSWORD_CHANGED,
            data: {}
        })
    }
}