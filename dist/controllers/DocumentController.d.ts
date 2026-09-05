import { NextFunction, Response, Request } from "express";
import { z } from "zod";
export declare const docShema: z.ZodObject<{
    entityType: z.ZodString;
    entityId: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
type UploadRequest = Request & {
    file?: Express.Multer.File;
};
export declare function upload(req: UploadRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function listAllDocuments(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getDocument(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function downloadDocument(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function deleteDocument(req: Request, res: Response, next: NextFunction): Promise<void>;
export {};
//# sourceMappingURL=DocumentController.d.ts.map