"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const typeorm_1 = require("typeorm");
const ApiError_1 = require("../Helpers/ApiError");
function notFoundHandler(req, res) {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.status).json({ error: err.message, details: err.details });
    }
    if (err instanceof typeorm_1.QueryFailedError && err.driverError?.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'A record with one of these values already exists.' });
    }
    const message = err instanceof Error ? err.message : 'Internal server error';
    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }
    res.status(500).json({ error: message });
}
//# sourceMappingURL=ErrorHandler.js.map