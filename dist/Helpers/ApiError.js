"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    status;
    details;
    constructor(status, message, details) {
        super(message);
        this.status = status;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, details) {
        return new ApiError(400, message, details);
    }
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message);
    }
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message);
    }
    static notFound(message = 'Resource not found') {
        return new ApiError(404, message);
    }
    static conflict(message) {
        return new ApiError(409, message);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map