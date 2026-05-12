import { Router } from "express";
import { Forecast } from "../models/Forecast";
import { optionalAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", optionalAuth, async (req, res) => {
  const { crop, region, period } = req.query;
  const filter: any = {};
  if (crop) filter.crop = crop;
  if (region) filter.region = region;
  if (period) filter.period = period;
  
  const forecasts = await Forecast.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, data: forecasts });
});

export default router;