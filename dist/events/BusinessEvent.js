"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessCategoryType = exports.BusinessEventType = void 0;
var BusinessEventType;
(function (BusinessEventType) {
    BusinessEventType["USER_CREATED"] = "USER_CREATED";
    BusinessEventType["USER_UPDATED"] = "USER_UPDATED";
    BusinessEventType["USER_DELETED"] = "USER_DELETED";
    BusinessEventType["TWO_FACTOR_OTP"] = "TWO_FACTOR_OTP";
    BusinessEventType["PASSWORD_RESET"] = "PASSWORD_RESET";
    BusinessEventType["PASSWORD_CHANGED"] = "PASSWORD_CHANGED";
    BusinessEventType["PASSWORD_OTP"] = "PASSWORD_OTP";
    BusinessEventType["USER_LOGIN"] = "USER_LOGIN";
    BusinessEventType["USER_LOGOUT"] = "USER_LOGOUT";
    BusinessEventType["USER_LOCKED"] = "USER_LOCKED";
    BusinessEventType["USER_ACTIVATED"] = "USER_ACTIVATED";
    BusinessEventType["USER_PROFILE_UPDATED"] = "USER_PROFILE_UPDATED";
    BusinessEventType["USER_PROFILE_DELETED"] = "USER_PROFILE_DELETED";
    BusinessEventType["USER_PROFILE_CREATED"] = "USER_PROFILE_CREATED";
    BusinessEventType["USER_PROFILE_PASSWORD_CHANGED"] = "USER_PROFILE_PASSWORD_CHANGED";
    BusinessEventType["USER_PROFILE_TWO_FACTOR_ENABLED"] = "USER_PROFILE_TWO_FACTOR_ENABLED";
    BusinessEventType["USER_PROFILE_TWO_FACTOR_DISABLED"] = "USER_PROFILE_TWO_FACTOR_DISABLED";
})(BusinessEventType || (exports.BusinessEventType = BusinessEventType = {}));
var BusinessCategoryType;
(function (BusinessCategoryType) {
    BusinessCategoryType["USER"] = "USER";
    BusinessCategoryType["TWO_FACTOR"] = "TWO_FACTOR";
    BusinessCategoryType["PASSWORD"] = "PASSWORD";
})(BusinessCategoryType || (exports.BusinessCategoryType = BusinessCategoryType = {}));
//# sourceMappingURL=BusinessEvent.js.map