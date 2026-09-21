import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {
    createTransaction,
    findAllTransaction,
    findTransaction, findTransactionSummary,
    updateTransaction
} from "../controllers/TransactionController";


export const transactionRouter = Router();

transactionRouter.post("/create", authenticate, asyncHandler(createTransaction) )
transactionRouter.get("/summary", authenticate, asyncHandler(findTransactionSummary));
transactionRouter.get("", authenticate, asyncHandler(findAllTransaction) )
transactionRouter.put("/:id/update", authenticate, asyncHandler(updateTransaction) )
transactionRouter.get("/:id", authenticate, asyncHandler(findTransaction) )
