import { Router } from "express";
import { Price } from "../models/Price";
import { optionalAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", optionalAuth, async (req, res) => {
  const { commodity, state } = req.query;
  const filter: any = {};
  if (commodity) filter.commodity = commodity;
  if (state) filter.state = state;
  
  const prices = await Price.find(filter).sort({ priceDate: -1 }).limit(30);
  res.json({ success: true, data: prices });
});

router.get("/comparison", optionalAuth, async (req, res) => {
  const { farmerId, crop } = req.query;
  res.json({ success: true, data: { farmerPrice: 2400, mandiPrice: 2600, gap: "+8.3%" } });
});

export default router;