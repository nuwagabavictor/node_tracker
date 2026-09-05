import { Request, Response, NextFunction } from "express";
export declare function getNotifications(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getUnreadNotifications(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getUnreadNotificationCount(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function markNotificationAsRead(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function markAllNotificationsAsRead(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=NotificationController.d.ts.map