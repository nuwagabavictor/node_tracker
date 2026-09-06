
import {Router} from "express";
import {authRouter} from "./AuthRouter";
import {documentRouter} from "./DocumentRouter";
import {notificationRouter} from "./NotificationRouter";
import {configRouter} from "./ConfigurationRouter";
import {categoryRouter} from "./CategoryRouter";
import {transactionRouter} from "./TransactionRouter";
import {budgetRouter} from "./BudgetRouter";

export default(): Router =>{

    const router = Router()
    router.use('/authentication', authRouter)
    router.use('/document', documentRouter)
    router.use('/notifications', notificationRouter)
    router.use('/configurations', configRouter)
    router.use('/categories', categoryRouter)
    router.use('/transactions', transactionRouter)
    router.use('/budgets', budgetRouter)



    return router
}