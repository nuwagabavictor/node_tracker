import {businessEventNotifier} from "./BusinessEventNotifierService";
import {UserCreatedBusinessEvent} from "./initiators/UserCreatedBusinessEvent";
import {EmailRegisterListener} from "./listeners/EmailRegisterListener";
import {TwoFactorBusinessEvent} from "./initiators/TwoFactorBusinessEvent";
import {EmailTwoFactorListener} from "./listeners/EmailTwoFactorListener";
import {PasswordChangeBusinessEvent} from "./initiators/PasswordChangeBusinessEvent";
import {PasswordChangeListener} from "./listeners/PasswordChangeListener";
import {PasswordOtpBusinessEvent} from "./initiators/PasswordOtpBusinessEvent";
import {PasswordOtpListener} from "./listeners/PasswordOtpListener";
import {UserLoggedInBusinessEvent} from "./initiators/UserLoggedInBusinessEvent";
import {GenericNotificationListener} from "./listeners/GenericNotificationListener";
import {NotificationService} from "../shared/NotificationService";
import {ChangeProfileBusinessEvent} from "./initiators/ChangeProfileBusinessEvent";

const notificationService = new NotificationService();

const genericNotificationListener = new GenericNotificationListener(notificationService);

businessEventNotifier.addPostBusinessEventListener(
    UserCreatedBusinessEvent, new EmailRegisterListener()
)

businessEventNotifier.addPostBusinessEventListener(
    TwoFactorBusinessEvent, new EmailTwoFactorListener()
)

businessEventNotifier.addPostBusinessEventListener(
    PasswordChangeBusinessEvent, new PasswordChangeListener()
)

businessEventNotifier.addPostBusinessEventListener(
    PasswordOtpBusinessEvent, new PasswordOtpListener()
)

businessEventNotifier.addPostBusinessEventListener(
    UserLoggedInBusinessEvent, genericNotificationListener
)

businessEventNotifier.addPostBusinessEventListener(
    ChangeProfileBusinessEvent, genericNotificationListener
)
