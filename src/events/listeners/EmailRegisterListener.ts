import {BusinessEventListener} from "../BusinessEventListener";
import {UserCreatedBusinessEvent} from "../initiators/UserCreatedBusinessEvent";
import {EmailEvent, emailService} from "../../shared/EmailService";

export class EmailRegisterListener implements BusinessEventListener<UserCreatedBusinessEvent>{

    async onBusinessEvent(event: UserCreatedBusinessEvent) {

        const user = event.get();
        await emailService.sendEmail({
            to: user.email,
            event: EmailEvent.WELCOME,
            data: {
                username: user.username
            }
        })
    }

}