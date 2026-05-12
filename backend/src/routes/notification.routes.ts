import { Router, Response } from "express";
import { Notification } from "../models/Notification";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, async (req: any, res: Response) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
