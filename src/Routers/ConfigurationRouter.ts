import {Router} from "express";
import {authenticate} from "../Middleware/AuthMiddleware";
import {asyncHandler} from "../Middleware/asyncHandler";
import {findAllConfigurations, findConfiguration, updateConfiguration} from "../controllers/ConfigurationController";


export const configRouter = Router()

configRouter.put("/:id/update", authenticate, asyncHandler(updateConfiguration))
configRouter.get("/:id", authenticate, asyncHandler(findConfiguration))
configRouter.get("", authenticate, asyncHandler(findAllConfigurations))