"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const ErrorHandler_1 = require("./Middleware/ErrorHandler");
const Routers_1 = __importDefault(require("./Routers"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
require("./events/EventConfiguration");
require("./schedulers/RegisterJobs");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin(origin, callback) {
        // No Origin header (curl, server-to-server, mobile app) — always allow.
        if (!origin)
            return callback(null, true);
        if (env_1.env.corsOrigins.includes(origin))
            return callback(null, true);
        // In development, Vite dev servers pick an arbitrary free port, so allow any
        // localhost/127.0.0.1 origin rather than hard-coding a port list.
        if (env_1.env.nodeEnv !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
            return callback(null, true);
        }
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
}));
const apiLimiter = (0, express_rate_limit_1.default)({ windowMs: 60_000, limit: 300, standardHeaders: true, legacyHeaders: false });
exports.app.use('/api', apiLimiter);
exports.app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api' }));
exports.app.use('/api/v1', (0, Routers_1.default)());
exports.app.use(ErrorHandler_1.errorHandler);
exports.app.use(ErrorHandler_1.notFoundHandler);
//# sourceMappingURL=app.js.map