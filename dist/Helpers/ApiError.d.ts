export declare class ApiError extends Error {
    status: number;
    details?: unknown;
    constructor(status: number, message: string, details?: unknown);
    static badRequest(message: string, details?: unknown): ApiError;
    static unauthorized(message?: string): ApiError;
    static forbidden(message?: string): ApiError;
    static notFound(message?: string): ApiError;
    static conflict(message: string): ApiError;
}
//# sourceMappingURL=ApiError.d.ts.map