"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = require("./AuthRouter");
const DocumentRouter_1 = require("./DocumentRouter");
const NotificationRouter_1 = require("./NotificationRouter");
exports.default = () => {
    const router = (0, express_1.Router)();
    router.use('/authentication', AuthRouter_1.authRouter);
    router.use('/document', DocumentRouter_1.documentRouter);
    router.use('/notifications', NotificationRouter_1.notificationRouter);
    return router;
};
//# sourceMappingURL=index.js.map