import { Router, Response } from "express";
import { Analytics } from "../models/Analytics";
import { optionalAuth } from "../middleware/auth.middleware";
import { redis, CACHE_TTL } from "../lib/redis";

const router = Router();

router.get("/", optionalAuth, async (req: any, res: Response) => {
  try {
    const { role, userId } = req.query;
    if (!role || !userId) return res.status(400).json({ error: "Missing role or userId" });

    const cacheKey = `analytics:${role}:${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const analytics = await Analytics.find({ role, userId }).sort({ createdAt: -1 });
    const response = { success: true, data: analytics };
    
    await redis.setex(cacheKey, CACHE_TTL.SHORT, JSON.stringify(response));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
