import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {
    createTransaction,
    findAllTransaction,
    findTransaction,
    updateTransaction
} from "../controllers/TransactionController";


export const transactionRouter = Router();

transactionRouter.post("/create", authenticate, asyncHandler(createTransaction) )
transactionRouter.put("/:id/update", authenticate, asyncHandler(updateTransaction) )
transactionRouter.get("/:id", authenticate, asyncHandler(findTransaction) )
transactionRouter.get("", authenticate, asyncHandler(findAllTransaction) )