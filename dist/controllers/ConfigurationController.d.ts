import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export declare const updateRequest: z.ZodObject<{
    enabled: z.ZodBoolean;
    stringValue: z.ZodString;
}, z.core.$strip>;
export declare function updateConfiguration(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findConfiguration(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function findAllConfigurations(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=ConfigurationController.d.ts.map