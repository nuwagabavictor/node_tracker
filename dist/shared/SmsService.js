"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsService = exports.SmsService = exports.SmsCategory = void 0;
const env_1 = require("../config/env");
const axios_1 = __importStar(require("axios"));
const ApiError_1 = require("../Helpers/ApiError");
var SmsCategory;
(function (SmsCategory) {
    SmsCategory["PASSWORD_RESET"] = "password_reset";
    SmsCategory["TWO_FACTOR_OTP"] = "two_factor_otp";
})(SmsCategory || (exports.SmsCategory = SmsCategory = {}));
class SmsService {
    async sendSms(request) {
        const payload = {
            ...request,
            sender_id: env_1.env.smsSenderId,
            message_category: "non_customised",
        };
        const baseUrl = env_1.env.smsUrl;
        try {
            const response = await axios_1.default.post(`${baseUrl}/v1/sms-sen`, payload, {
                headers: {
                    Authorization: env_1.env.smsApiKey,
                    "Content-Type": "application/json",
                },
            });
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
        }
        catch (error) {
            if ((0, axios_1.isAxiosError)(error)) {
                const status = error.response?.status;
                const responseBody = error.response?.data;
                if (status && status >= 400 && status < 500) {
                    throw ApiError_1.ApiError.badRequest(`SMS client error: ${JSON.stringify(responseBody)}`);
                }
                if (status && status >= 500) {
                    throw new ApiError_1.ApiError(502, `SMS provider error: ${JSON.stringify(responseBody)}`);
                }
                throw new ApiError_1.ApiError(502, `SMS request failed: ${error.message}`);
            }
            throw new ApiError_1.ApiError(500, error instanceof Error
                ? error.message
                : "Unknown SMS error");
        }
    }
    async processSmsOTPCategory(category, recipient, otp) {
        let message;
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
                throw new Error(`Unsupported SMS category: ${category}`);
        }
        const request = {
            message,
            recipients: recipient
        };
        await this.sendSms(request);
    }
}
exports.SmsService = SmsService;
exports.smsService = new SmsService();
//# sourceMappingURL=SmsService.js.map