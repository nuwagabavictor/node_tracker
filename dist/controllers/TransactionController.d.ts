import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export declare const transObj: z.ZodObject<{
    categoryId: z.ZodNumber;
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare function createTransaction(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateTransaction(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findAllTransaction(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findTransaction(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=TransactionController.d.ts.map