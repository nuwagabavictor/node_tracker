"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.EmailService = exports.EmailEvent = void 0;
const env_1 = require("../config/env");
const nodemailer_1 = __importDefault(require("nodemailer"));
var EmailEvent;
(function (EmailEvent) {
    EmailEvent["TWOFACTOR_OTP"] = "TWOFACTOR_OTP";
    EmailEvent["PASSWORD_OTP"] = "PASSWORD_OTP";
    EmailEvent["PASSWORD_CHANGED"] = "PASSWORD_CHANGED";
    EmailEvent["WELCOME"] = "WELCOME";
    EmailEvent["ACCOUNT_LOCKED"] = "ACCOUNT_LOCKED";
    EmailEvent["ACCOUNT_ACTIVATED"] = "ACCOUNT_ACTIVATED";
    EmailEvent["BUDGET_EXCEEDED"] = "BUDGET_EXCEEDED";
    EmailEvent["DAILY_REMINDER"] = "DAILY_REMINDER";
})(EmailEvent || (exports.EmailEvent = EmailEvent = {}));
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: env_1.env.emailHost,
            port: env_1.env.emailPort,
            secure: env_1.env.secure,
            auth: {
                user: env_1.env.emailUser,
                pass: env_1.env.emailPass,
            },
        });
    }
    async sendEmail(email) {
        const template = this.getTemplate(email.event, email.data ?? {});
        await this.transporter.sendMail({
            from: env_1.env.emailUser,
            to: email.to,
            subject: template.subject,
            html: template.html,
        });
    }
    getTemplate(event, data) {
        switch (event) {
            case EmailEvent.PASSWORD_OTP:
                return {
                    subject: "Password Reset OTP",
                    html: `
                        <h2>Password Reset</h2>

                        <p>Your password reset OTP is:</p>

                        <h1>${data.otp}</h1>

                        <p>
                            This OTP expires in
                            ${data.expiryMinutes} minutes.
                        </p>

                        <p>
                            If you did not request a password reset,
                            please ignore this email.
                        </p>
                    `,
                };
            case EmailEvent.TWOFACTOR_OTP:
                return {
                    subject: "Two factor OTP",
                    html: `
                        <h2>TFA OTP</h2>
    
                        <p>Your Login OTP is:</p>
    
                        <h1>${data.otp}</h1>
    
                        <p>
                            This OTP expires in
                            ${data.expiryMinutes} minutes.
                        </p>
    
                        <p>
                            If you did not request a otp,
                            please ignore this email.
                        </p>
                    `,
                };
            case EmailEvent.PASSWORD_CHANGED:
                return {
                    subject: "Password Changed Successfully",
                    html: `
                        <h2>Password Changed</h2>

                        <p>
                            Your password has been changed successfully.
                        </p>

                        <p>
                            If you did not make this change,
                            please contact support immediately.
                        </p>
                    `,
                };
            case EmailEvent.WELCOME:
                return {
                    subject: "Welcome",
                    html: `
                        <h2>Welcome ${data.username}</h2>

                        <p>
                            Your account has been created successfully.
                        </p>
                    `,
                };
            case EmailEvent.ACCOUNT_LOCKED:
                return {
                    subject: "Account Locked",
                    html: `
                        <h2>Account Locked</h2>

                        <p>
                            Your account has been locked.
                        </p>
                    `,
                };
            case EmailEvent.ACCOUNT_ACTIVATED:
                return {
                    subject: "Account Activated",
                    html: `
                        <h2>Account Activated</h2>

                        <p>
                            Your account has been activated successfully.
                        </p>
                    `,
                };
            case EmailEvent.BUDGET_EXCEEDED:
                return {
                    subject: "Budget Set Exceeded",
                    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Budget Exceeded</h2>

                <p>Hello ${data.budget.user.username},</p>

                <p>
                    This is a notification to let you know that you have exceeded
                    your budget for <strong>${data.budget.category.name}</strong>.
                </p>

                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Budget:</strong> ${data.budget.amount}</p>
                    <p><strong>Amount Spent:</strong> ${data.amountSpent}</p>
                    <p><strong>Exceeded By:</strong> ${data.exceededBy}</p>
                    <p><strong>Period:</strong> ${data.budget.startDate} - ${data.budget.endDate}</p>
                </div>

                <p>
                    Please review your recent expenses and consider adjusting
                    your spending to stay within your budget.
                </p>

                <p>
                    Regards,<br>
                    <strong>Restart Finance</strong>
                </p>
            </div>
        `
                };
            case EmailEvent.DAILY_REMINDER:
                return {
                    subject: "Daily Finance Reminder",
                    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Daily Finance Reminder</h2>

                <p>Hello ${data.user.username},</p>

                <p>
                    We noticed that you haven't recorded any income or expenses
                    in your account for yesterday.
                </p>

                <p>
                    Keeping your transactions up to date helps you understand
                    your spending habits, track your budgets, and stay on top
                    of your finances.
                </p>

                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p>
                        <strong>Reminder:</strong>
                        Please take a moment to record any income or expenses
                        you may have had.
                    </p>
                </div>

                <p>
                    Keep your finances on track!
                </p>

                <p>
                    Regards,<br>
                    <strong>Restart Finance</strong>
                </p>
            </div>
        `
                };
            default:
                throw new Error(`Unsupported email event: ${event}`);
        }
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
//# sourceMappingURL=EmailService.js.map