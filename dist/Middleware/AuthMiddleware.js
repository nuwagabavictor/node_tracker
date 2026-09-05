"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.generateToken = generateToken;
exports.refreshAccessToken = refreshAccessToken;
exports.generateTwoFactorToken = generateTwoFactorToken;
exports.authMiddleware = authMiddleware;
exports.authorize = authorize;
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const ApiError_1 = require("../Helpers/ApiError");
const User_1 = require("../Entities/User");
const RefreshToken_1 = require("../Entities/RefreshToken");
const TwoFactor_1 = require("../Entities/TwoFactor");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_ALGORITHM = "HS256";
function signAccessToken(payload) {
    const secret = env_1.env.jwtAccessSecret;
    const options = {
        algorithm: JWT_ALGORITHM,
        expiresIn: env_1.env.jwtAccessTtl
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
function isJwtPayload(value) {
    return (typeof value === "object" &&
        value !== null &&
        typeof value.id === "number" &&
        typeof value.email === "string" &&
        typeof value.role === "string");
}
function verifyAccessToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtAccessSecret, {
        algorithms: [JWT_ALGORITHM],
    });
    if (!isJwtPayload(decoded)) {
        throw new jsonwebtoken_1.default.JsonWebTokenError("Malformed token payload");
    }
    return decoded;
}
async function generateToken(user) {
    // random refresh token
    const refreshToken = crypto_1.default.randomBytes(64).toString("hex");
    const refresh = RefreshToken_1.RefreshToken.createToken({ user: user, tokenHash: refreshToken, expiryDays: 30 });
    await refresh.save();
    return refresh.tokenHash;
}
async function refreshAccessToken(refreshToken) {
    const token = await RefreshToken_1.RefreshToken.findOne({ where: { tokenHash: refreshToken } });
    if (!token)
        throw new Error("Invalid refresh token");
    if (token.isExpired())
        throw new Error("Refresh token expired");
    if (!token.isValid())
        throw new Error("Refresh token already used");
    token.markUsed();
    await token.save();
    const user = token.user;
    const accessToken = signAccessToken({ id: user.getId(), email: user.getEmail(), role: user.getRole() });
    const newRefreshToken = await generateToken(token.user);
    const responseObj = {
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        },
        accessToken: accessToken,
        refreshToken: newRefreshToken
    };
    return responseObj;
}
async function generateTwoFactorToken(user) {
    // invalidate previous unused tokens
    await TwoFactor_1.TwoFactor.update({ userId: user.id, used: false }, { used: true });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt_1.default.hash(otp, 10);
    const factor = TwoFactor_1.TwoFactor.createForUser({
        user,
        otpHash,
        expiryMinutes: 5
    });
    await factor.save();
    return otp;
}
async function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(ApiError_1.ApiError.unauthorized("Authorization header is missing"));
    }
    if (!authorization.startsWith("Bearer ")) {
        return next(ApiError_1.ApiError.unauthorized("Authorization header is not in the correct format"));
    }
    const token = authorization.substring(7).trim();
    if (!token) {
        return next(ApiError_1.ApiError.unauthorized("Bearer token is empty"));
    }
    let payload;
    try {
        payload = verifyAccessToken(token);
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(ApiError_1.ApiError.unauthorized("Token has expired"));
        }
        if (e instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(ApiError_1.ApiError.unauthorized("Invalid token"));
        }
        // Unexpected error verifying the token — don't mask it as a 401 silently
        console.error("Unexpected error verifying access token:", e);
        return next(ApiError_1.ApiError.unauthorized("Invalid or expired token"));
    }
    try {
        const user = await User_1.User.findOne({ where: { id: payload.id } });
        if (!user) {
            return next(ApiError_1.ApiError.unauthorized("User not found"));
        }
        if (!user.canLogin()) {
            return next(ApiError_1.ApiError.forbidden("Account is disabled or locked"));
        }
        req.user = {
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        };
        next();
    }
    catch (e) {
        // DB / infra failure — this is a real 500, not an auth failure
        console.error("Error loading user during authentication:", e);
        return next(ApiError_1.ApiError.unauthorized("Failed to authenticate request"));
    }
}
function authorize(...roles) {
    return (req, _res, next) => {
        if (!req.user) {
            return next(ApiError_1.ApiError.unauthorized());
        }
        if (roles.length > 0 && !roles.includes(req.user.role)) {
            return next(ApiError_1.ApiError.forbidden(`Role ${req.user.role} is not permitted to perform this action`));
        }
        next();
    };
}
function authenticate(req, _res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return next(ApiError_1.ApiError.unauthorized('Missing bearer token'));
    }
    try {
        const token = header.slice('Bearer '.length);
        const payload = verifyAccessToken(token);
        req.user = { id: payload.id, email: payload.email, role: payload.role };
        next();
    }
    catch {
        next(ApiError_1.ApiError.unauthorized('Invalid or expired token'));
    }
}
//# sourceMappingURL=AuthMiddleware.js.map