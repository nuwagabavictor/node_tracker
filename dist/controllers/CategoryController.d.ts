import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CategoryType } from "../enums/enum";
export declare const categoryRequest: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodString;
}, z.core.$strip>;
export declare const categoryUpdateRequest: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        INCOME: "INCOME";
        EXPENSE: "EXPENSE";
    }>>;
    active: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare function isCategoryType(type: string): type is CategoryType;
export declare function createCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=CategoryController.d.ts.map