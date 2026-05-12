import { Router } from "express";
import { Retailer } from "../models/Retailer";
const router = Router();
router.get("/", async (req, res) => {
  const retailers = await Retailer.find();
  res.json({ success: true, data: retailers });
});
export default router;