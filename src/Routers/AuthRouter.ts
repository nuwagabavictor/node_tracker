import {Router} from "express";
import {asyncHandler} from "../Middleware/asyncHandler";
import {
    changePassword, changeProfile,
    loginHandler,
    refreshHandler,
    registerHandler, requestPasswordChange, requestPasswordOtp,
    twoFactorHandler
} from "../controllers/UserController";
import {authenticate} from "../Middleware/AuthMiddleware";


export const authRouter = Router();

authRouter.post('/register', asyncHandler(registerHandler))
authRouter.post('/login', asyncHandler(loginHandler))
authRouter.get('/token', asyncHandler(refreshHandler))
authRouter.post('/twofactor', asyncHandler(twoFactorHandler))
authRouter.post('change-password/:id', authenticate, asyncHandler(changePassword))
authRouter.post('/password-token', asyncHandler(requestPasswordOtp))
authRouter.post("change-password", asyncHandler(requestPasswordChange))
authRouter.post("/change-profile", authenticate, asyncHandler(changeProfile))