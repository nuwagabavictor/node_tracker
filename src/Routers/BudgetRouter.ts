import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {createBudget, findAllBudgets, findBudget, updateBudget} from "../controllers/BudgetController";

export const budgetRouter = Router()

budgetRouter.post("/create", authenticate, asyncHandler(createBudget));
budgetRouter.put("/:id/update", authenticate, asyncHandler(updateBudget));
budgetRouter.get("/:id", authenticate, asyncHandler(findBudget));
budgetRouter.get("", authenticate, asyncHandler(findAllBudgets));