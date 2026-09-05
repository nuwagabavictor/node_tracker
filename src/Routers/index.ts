
import {Router} from "express";
import {authRouter} from "./AuthRouter";
import {documentRouter} from "./DocumentRouter";
import {notificationRouter} from "./NotificationRouter";

export default(): Router =>{

    const router = Router()
    router.use('/authentication', authRouter)
    router.use('/document', documentRouter)
    router.use('/notifications', notificationRouter)

    return router
}