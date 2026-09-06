import {BusinessEventListener} from "../BusinessEventListener";
import {UserSkippedDayBusinessEvent} from "../initiators/UserSkippedDayBusinessEvent";
import {EmailEvent, emailService} from "../../shared/EmailService";

export class UserSkippedDayEmailListener implements BusinessEventListener<UserSkippedDayBusinessEvent>{

    async onBusinessEvent(event: UserSkippedDayBusinessEvent) {

        const user = event.get();
        await emailService.sendEmail({
            to: user.email,
            event: EmailEvent.DAILY_REMINDER,
            data: {
                username: user.username,
            }
        })
    }
}