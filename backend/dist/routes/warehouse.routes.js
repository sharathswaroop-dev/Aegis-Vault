"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Warehouse_1 = require("../models/Warehouse");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const { role, userId } = req.query;
        let filter = {};
        if (role === "farmer" && userId)
            filter.linkedFarmers = userId;
        else if (role === "distributor" && userId)
            filter.linkedDistributors = userId;
        const warehouses = await Warehouse_1.Warehouse.find(filter).sort({ name: 1 });
        res.json({ success: true, data: warehouses, count: warehouses.length });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch warehouses" });
    }
});
exports.default = router;
