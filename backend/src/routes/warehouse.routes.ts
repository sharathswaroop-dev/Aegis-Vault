import { Router, Response } from "express";
import { Warehouse } from "../models/Warehouse";
import { optionalAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", optionalAuth, async (req: any, res: Response) => {
  try {
    const { role, userId } = req.query;
    let filter: any = {};
    
    if (role === "farmer" && userId) filter.linkedFarmers = userId;
    else if (role === "distributor" && userId) filter.linkedDistributors = userId;
    
    const warehouses = await Warehouse.find(filter).sort({ name: 1 });
    res.json({ success: true, data: warehouses, count: warehouses.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warehouses" });
  }
});

export default router;
