"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Analytics_1 = require("../models/Analytics");
const auth_middleware_1 = require("../middleware/auth.middleware");
const redis_1 = require("../lib/redis");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const { role, userId } = req.query;
        if (!role || !userId)
            return res.status(400).json({ error: "Missing role or userId" });
        const cacheKey = `analytics:${role}:${userId}`;
        const cached = await redis_1.redis.get(cacheKey);
        if (cached)
            return res.json(JSON.parse(cached));
        const analytics = await Analytics_1.Analytics.find({ role, userId }).sort({ createdAt: -1 });
        const response = { success: true, data: analytics };
        await redis_1.redis.setex(cacheKey, redis_1.CACHE_TTL.SHORT, JSON.stringify(response));
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});
exports.default = router;
