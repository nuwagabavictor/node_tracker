import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { QueryFailedError } from 'typeorm'
import {ApiError} from "../Helpers/ApiError";

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({ error: 'Validation failed', details: err.issues })
    }

    if (err instanceof ApiError) {
        return res.status(err.status).json({ error: err.message, details: err.details })
    }

    if (err instanceof QueryFailedError && (err as unknown as { driverError?: { code?: string } }).driverError?.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'A record with one of these values already exists.' })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'
    if (process.env.NODE_ENV !== 'production') {
        console.error(err)
    }
    res.status(500).json({ error: message })
}
