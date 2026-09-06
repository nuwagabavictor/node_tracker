import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {env} from "./config/env";
import {notFoundHandler, errorHandler} from "./Middleware/ErrorHandler";
import router from "./Routers";
import rateLimit from 'express-rate-limit'
import "./events/EventConfiguration"
import "./schedulers/RegisterJobs"


export const app = express();

app.use(helmet());
app.use(express.json());

app.use(
    cors({
        origin(origin, callback) {
            // No Origin header (curl, server-to-server, mobile app) — always allow.
            if (!origin) return callback(null, true)
            if (env.corsOrigins.includes(origin)) return callback(null, true)
            // In development, Vite dev servers pick an arbitrary free port, so allow any
            // localhost/127.0.0.1 origin rather than hard-coding a port list.
            if (env.nodeEnv !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
                return callback(null, true)
            }
            callback(new Error(`Origin ${origin} is not allowed by CORS`))
        },
        credentials: true,
    }),
)

const apiLimiter = rateLimit({ windowMs: 60_000, limit: 300, standardHeaders: true, legacyHeaders: false })
app.use('/api', apiLimiter)

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api' }))

app.use('/api/v1', router())

app.use(errorHandler);
app.use(notFoundHandler);
