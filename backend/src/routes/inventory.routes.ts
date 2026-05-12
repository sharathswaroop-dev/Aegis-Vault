import { Router } from "express";
import { Lot } from "../models/Lot";
import { Warehouse } from "../models/Warehouse";
import { optionalAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/summary", optionalAuth, async (req: any, res) => {
  try {
    const { role, userId } = req.query;
    
    let lotFilter: any = {};
    if (role === "farmer" && userId) lotFilter.farmerId = userId;
    else if (role === "warehouse" && userId) lotFilter.warehouseId = userId;
    
    const lots = await Lot.find(lotFilter);
    
    const categoryBreakdown = lots.reduce((acc: any, lot) => {
      acc[lot.category] = (acc[lot.category] || 0) + 1;
      return acc;
    }, {});
    
    const totalItems = lots.length;
    const avgFreshness = lots.reduce((sum, l) => sum + l.freshnessAge, 0) / (lots.length || 1);
    const atRiskCount = lots.filter(l => l.freshnessStatus === "at-risk" || l.freshnessStatus === "urgent").length;
    
    const warehouses = await Warehouse.find();
    const avgColdChain = warehouses.reduce((sum, w) => sum + w.healthScore, 0) / (warehouses.length || 1);
    
    res.json({
      success: true,
      data: {
        itemsMonitored: totalItems,
        avgFreshnessAge: avgFreshness.toFixed(1),
        coldChainHealth: avgColdChain.toFixed(1),
        atRiskLots: atRiskCount,
        categoryBreakdown
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get inventory summary" });
  }
});

export default router;