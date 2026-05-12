"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwnerOrAdmin = exports.authorize = void 0;
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Not authorized for this action" });
        }
        next();
    };
};
exports.authorize = authorize;
const isOwnerOrAdmin = (userIdParam) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        const resourceUserId = req.params[userIdParam] || req.body.userId;
        if (req.user.role === "admin" || req.user.userId === resourceUserId) {
            next();
        }
        else {
            return res.status(403).json({ error: "Not authorized" });
        }
    };
};
exports.isOwnerOrAdmin = isOwnerOrAdmin;
