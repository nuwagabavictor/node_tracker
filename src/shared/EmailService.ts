import {env} from "../config/env";
import nodemailer, {Transporter} from "nodemailer";

export type EmailData={
    to: string,
    event: EmailEvent,
    data: Record<string, any>,
}

export enum EmailEvent {
    TWOFACTOR_OTP = "TWOFACTOR_OTP",
    PASSWORD_OTP = "PASSWORD_OTP",
    PASSWORD_CHANGED = "PASSWORD_CHANGED",
    WELCOME = "WELCOME",
    ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
    ACCOUNT_ACTIVATED = "ACCOUNT_ACTIVATED",
}

export type EmailTemplate = {
    subject: string,
    html: string
}

export class EmailService {

    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.emailHost,
            port: env.emailPort,
            secure: env.secure,
            auth: {
                user: env.emailUser,
                pass: env.emailPass,
            },
        });
    }



    async sendEmail(email: EmailData): Promise<void> {

        const template = this.getTemplate(email.event, email.data ?? {});

        await this.transporter.sendMail({
            from: env.emailUser,
            to: email.to,
            subject: template.subject,
            html: template.html,
        });
    }

    private getTemplate(event: EmailEvent, data: Record<string, any>): EmailTemplate {

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

            default:
                throw new Error(`Unsupported email event: ${event}`);
        }
    }


}
export const emailService = new EmailService();