export type SmsRequest = {
    message: string;
    recipients: string;
};
export declare enum SmsCategory {
    PASSWORD_RESET = "password_reset",
    TWO_FACTOR_OTP = "two_factor_otp"
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
export declare class SmsService {
    sendSms(request: SmsRequest): Promise<SmsResponse | null>;
    processSmsOTPCategory(category: SmsCategory, recipient: string, otp: string): Promise<void | null>;
}
export declare const smsService: SmsService;
//# sourceMappingURL=SmsService.d.ts.map