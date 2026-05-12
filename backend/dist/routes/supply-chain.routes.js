"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Warehouse_1 = require("../models/Warehouse");
const Distributor_1 = require("../models/Distributor");
const Retailer_1 = require("../models/Retailer");
const Lot_1 = require("../models/Lot");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/map", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const { role, userId } = req.query;
        const warehouses = await Warehouse_1.Warehouse.find();
        const distributors = await Distributor_1.Distributor.find();
        const retailers = await Retailer_1.Retailer.find();
        const nodes = [
            ...warehouses.map(w => ({ type: "warehouse", id: w._id.toString(), name: w.name, location: w.location, lat: w.lat, lng: w.lng, status: w.status, utilization: w.utilizationPercent })),
            ...distributors.map(d => ({ type: "distributor", id: d._id.toString(), name: d.companyName, location: d.location, lat: d.lat, lng: d.lng, status: d.status, fillRate: d.fillRate })),
            ...retailers.map(r => ({ type: "retailer", id: r._id.toString(), name: r.storeName, location: r.location, lat: r.lat, lng: r.lng, status: r.status }))
        ];
        let connections = [];
        if (role === "admin") {
            connections = [
                ...warehouses.flatMap(w => w.linkedFarmers.map(f => ({ from: f, to: w._id.toString(), type: "farm-to-warehouse" }))),
                ...warehouses.flatMap(w => w.linkedDistributors.map(d => ({ from: w._id.toString(), to: d, type: "warehouse-to-distributor" }))),
                ...distributors.flatMap(d => d.linkedRetailers.map(r => ({ from: d._id.toString(), to: r, type: "distributor-to-retailer" })))
            ];
        }
        else if (role === "farmer" && userId) {
            const farmerLots = await Lot_1.Lot.find({ farmerId: userId });
            const whIds = [...new Set(farmerLots.map(l => l.warehouseId).filter(Boolean))];
            const dsIds = [...new Set(farmerLots.map(l => l.distributorId).filter(Boolean))];
            const rtIds = [...new Set(farmerLots.map(l => l.retailerId).filter(Boolean))];
            connections = [
                ...whIds.map(w => ({ from: userId, to: w, type: "farm-to-warehouse" })),
                ...dsIds.map(d => ({ from: whIds[0], to: d, type: "warehouse-to-distributor" })),
                ...rtIds.map(r => ({ from: dsIds[0], to: r, type: "distributor-to-retailer" }))
            ].filter(c => c.from && c.to);
        }
        res.json({ success: true, data: { nodes, connections } });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch supply chain map" });
    }
});
exports.default = router;
