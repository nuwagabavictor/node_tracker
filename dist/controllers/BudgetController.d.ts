import { Request, Response, NextFunction } from 'express';
import { z } from "zod";
import { BudgetPeriod } from "../enums/enum";
export declare const budgetRequest: z.ZodObject<{
    amount: z.ZodNumber;
    period: z.ZodEnum<typeof BudgetPeriod>;
    categoryId: z.ZodNumber;
}, z.core.$strip>;
export declare const budgetRequestUpdate: z.ZodObject<{
    amount: z.ZodNumber;
    period: z.ZodEnum<typeof BudgetPeriod>;
}, z.core.$strip>;
export declare function createBudget(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateBudget(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findAllBudgets(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findBudget(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=BudgetController.d.ts.map