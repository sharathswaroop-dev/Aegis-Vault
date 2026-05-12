"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.authenticate = authenticate;
const optionalAuth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return next();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
    }
    catch (error) {
        // Token invalid, continue without user
    }
    next();
};
exports.optionalAuth = optionalAuth;
