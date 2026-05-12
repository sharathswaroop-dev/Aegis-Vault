import { Router } from "express";
import { Distributor } from "../models/Distributor";

const router = Router();
router.get("/", async (req, res) => {
  const distributors = await Distributor.find();
  res.json({ success: true, data: distributors });
});
export default router;