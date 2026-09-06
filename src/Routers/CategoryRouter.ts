import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {
    createCategory,
    deleteCategory,
    findAllCategories,
    findCategory,
    updateCategory
} from "../controllers/CategoryController";

export const categoryRouter = Router()

categoryRouter.post("/create", authenticate, asyncHandler(createCategory))
categoryRouter.put("/:id/update", authenticate, asyncHandler(updateCategory))
categoryRouter.delete("/:id/delete", authenticate, asyncHandler(deleteCategory))
categoryRouter.get("", authenticate, asyncHandler(findAllCategories))
categoryRouter.get("/:id", authenticate, asyncHandler(findCategory))