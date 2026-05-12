"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notification_1 = require("../models/Notification");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const notifications = await Notification_1.Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(50);
        res.json({ success: true, data: notifications });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});
exports.default = router;
