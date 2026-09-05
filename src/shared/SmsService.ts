import { env } from "../config/env";
import axios, { isAxiosError } from "axios";
import {ApiError} from "../Helpers/ApiError";

export type SmsRequest = {
    message: string;
    recipients: string;
};

export enum SmsCategory {
    PASSWORD_RESET = "password_reset",
    TWO_FACTOR_OTP = "two_factor_otp",
}

export type SmsResponse = {
    statusCode: string;
    success: boolean;
    messages: string[];
    data: SmsResponseData | null;
};

export type SmsResponseData = {
    sms_cost: number;
    new_balance: number;
};

export class SmsService {

    async sendSms(request: SmsRequest): Promise<SmsResponse | null> {

        const payload = {
            ...request,
            sender_id: env.smsSenderId,
            message_category: "non_customised",
        };

        const baseUrl = env.smsUrl;

        try {

            const response = await axios.post<SmsResponse>(
                `${baseUrl}/v1/sms-sen`,
                payload,
                {
                    headers: {
                        Authorization: env.smsApiKey,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("SMS Success:", response.data);

            const body = response.data;

            return {
                statusCode: body.statusCode,
                success: body.success,
                messages: body.messages,
                data: body.data
                    ? {
                        sms_cost: body.data.sms_cost,
                        new_balance: body.data.new_balance,
                    }
                    : null,
            };

        } catch (error: unknown) {

            if (isAxiosError(error)) {

                const status = error.response?.status;
                const responseBody = error.response?.data;

                if (status && status >= 400 && status < 500) {
                    throw ApiError.badRequest(`SMS client error: ${JSON.stringify(responseBody)}`);
                }

                if (status && status >= 500) {
                    throw new ApiError(502, `SMS provider error: ${JSON.stringify(responseBody)}`);
                }

                throw new ApiError(502, `SMS request failed: ${error.message}`);
            }

            throw new ApiError(
                500,
                error instanceof Error
                    ? error.message
                    : "Unknown SMS error"
            );
        }
    }

    async processSmsOTPCategory(category: SmsCategory, recipient: string, otp: string): Promise<void | null> {

        let message: string;

        switch (category) {

            case SmsCategory.PASSWORD_RESET:

                message =
                    `Your password reset OTP is ${otp}. ` +
                    `This OTP will expire in 5 minutes. ` +
                    `If you did not request a password reset, ` +
                    `please ignore this message.`;

                break;

            case SmsCategory.TWO_FACTOR_OTP:

                message =
                    `Your verification OTP is ${otp}. ` +
                    `This OTP will expire in 5 minutes. ` +
                    `Do not share this code with anyone.`;

                break;

            default:
                throw new Error(
                    `Unsupported SMS category: ${category}`
                );
        }

        const request: SmsRequest = {
            message,
            recipients: recipient
        };

        await this.sendSms(request);
    }
}

export const smsService = new SmsService();