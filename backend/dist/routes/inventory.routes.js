"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Lot_1 = require("../models/Lot");
const Warehouse_1 = require("../models/Warehouse");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/summary", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const { role, userId } = req.query;
        let lotFilter = {};
        if (role === "farmer" && userId)
            lotFilter.farmerId = userId;
        else if (role === "warehouse" && userId)
            lotFilter.warehouseId = userId;
        const lots = await Lot_1.Lot.find(lotFilter);
        const categoryBreakdown = lots.reduce((acc, lot) => {
            acc[lot.category] = (acc[lot.category] || 0) + 1;
            return acc;
        }, {});
        const totalItems = lots.length;
        const avgFreshness = lots.reduce((sum, l) => sum + l.freshnessAge, 0) / (lots.length || 1);
        const atRiskCount = lots.filter(l => l.freshnessStatus === "at-risk" || l.freshnessStatus === "urgent").length;
        const warehouses = await Warehouse_1.Warehouse.find();
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get inventory summary" });
    }
});
exports.default = router;
