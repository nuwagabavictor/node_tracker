export type EmailData = {
    to: string;
    event: EmailEvent;
    data: Record<string, any>;
};
export declare enum EmailEvent {
    TWOFACTOR_OTP = "TWOFACTOR_OTP",
    PASSWORD_OTP = "PASSWORD_OTP",
    PASSWORD_CHANGED = "PASSWORD_CHANGED",
    WELCOME = "WELCOME",
    ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
    ACCOUNT_ACTIVATED = "ACCOUNT_ACTIVATED",
    BUDGET_EXCEEDED = "BUDGET_EXCEEDED",
    DAILY_REMINDER = "DAILY_REMINDER"
}
export type EmailTemplate = {
    subject: string;
    html: string;
};
export declare class EmailService {
    private transporter;
    constructor();
    sendEmail(email: EmailData): Promise<void>;
    private getTemplate;
}
export declare const emailService: EmailService;
//# sourceMappingURL=EmailService.d.ts.map