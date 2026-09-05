import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
type UploadParams = ParamsDictionary & {
    subjectType: string;
    subjectId: string;
    documentType: string;
};
type UploadRequest = Request<UploadParams> & {
    file?: Express.Multer.File;
};
type SubjectParams = ParamsDictionary & {
    subjectType: string;
    subjectId: string;
};
export declare function uploadDocument(req: UploadRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getProfile(req: Request<SubjectParams>, res: Response, next: NextFunction): Promise<void>;
export declare function getChecklist(req: Request<SubjectParams>, res: Response, next: NextFunction): Promise<void>;
export declare function approveDocument(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function rejectDocument(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=KycController.d.ts.map