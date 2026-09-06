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
import {UserSkippedDayBusinessEvent} from "./initiators/UserSkippedDayBusinessEvent";
import {BudgetExceededBusinessEvent} from "./initiators/BudgetExceededBusinessEvent";
import {BudgetExceededBusinessEmailListener} from "./listeners/BudgetExceededEmailListener";
import {UserSkippedDayEmailListener} from "./listeners/UserSkippedDayEmailListener";
import {CategoryCreatedBusinessEvent} from "./initiators/CategoryCreatedBusinessEvent";
import {BudgetCreatedBusinessEvent} from "./initiators/BudgetCreatedBusinessEvent";
import {TransactionCreatedBusinessEvent} from "./initiators/TransactionCreatedBusinessEvent";

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

businessEventNotifier.addPostBusinessEventListener(
    UserSkippedDayBusinessEvent, genericNotificationListener
)
businessEventNotifier.addPostBusinessEventListener(
    BudgetExceededBusinessEvent, genericNotificationListener
)

businessEventNotifier.addPostBusinessEventListener(
    CategoryCreatedBusinessEvent, genericNotificationListener
)

businessEventNotifier.addPostBusinessEventListener(
    BudgetCreatedBusinessEvent, genericNotificationListener
)
businessEventNotifier.addPostBusinessEventListener(
    TransactionCreatedBusinessEvent, genericNotificationListener
)


businessEventNotifier.addPostBusinessEventListener(
    BudgetExceededBusinessEvent, new BudgetExceededBusinessEmailListener()
)

businessEventNotifier.addPostBusinessEventListener(
    UserSkippedDayBusinessEvent, new UserSkippedDayEmailListener()
)
