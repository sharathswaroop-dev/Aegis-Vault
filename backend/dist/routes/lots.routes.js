"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Lot_1 = require("../models/Lot");
const auth_middleware_1 = require("../middleware/auth.middleware");
const redis_1 = require("../lib/redis");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const { role, userId } = req.query;
        let filter = {};
        if (role === "farmer" && userId)
            filter.farmerId = userId;
        else if (role === "warehouse" && userId)
            filter.warehouseId = userId;
        else if (role === "distributor" && userId)
            filter.distributorId = userId;
        else if (role === "retailer" && userId)
            filter.retailerId = userId;
        const lots = await Lot_1.Lot.find(filter).sort({ createdAt: -1 }).lean();
        const today = new Date();
        const processedLots = lots.map(lot => {
            const ageDiffTime = Math.abs(today.getTime() - new Date(lot.harvestDate).getTime());
            const ageDiffDays = Math.floor(ageDiffTime / (1000 * 60 * 60 * 24));
            let freshnessStatus = lot.freshnessStatus;
            const expiryDiffTime = new Date(lot.expiryDate).getTime() - today.getTime();
            const expiryDiffDays = Math.ceil(expiryDiffTime / (1000 * 60 * 60 * 24));
            if (expiryDiffDays <= 3)
                freshnessStatus = "urgent";
            else if (expiryDiffDays <= 7)
                freshnessStatus = "at-risk";
            else
                freshnessStatus = "fresh";
            return {
                ...lot,
                freshnessAge: ageDiffDays,
                freshnessStatus
            };
        });
        res.json({ success: true, data: processedLots, count: processedLots.length });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch lots" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const lot = await Lot_1.Lot.findById(req.params.id).lean();
        if (!lot)
            return res.status(404).json({ error: "Lot not found" });
        const today = new Date();
        const ageDiffTime = Math.abs(today.getTime() - new Date(lot.harvestDate).getTime());
        const ageDiffDays = Math.floor(ageDiffTime / (1000 * 60 * 60 * 24));
        let freshnessStatus = lot.freshnessStatus;
        const expiryDiffTime = new Date(lot.expiryDate).getTime() - today.getTime();
        const expiryDiffDays = Math.ceil(expiryDiffTime / (1000 * 60 * 60 * 24));
        if (expiryDiffDays <= 3)
            freshnessStatus = "urgent";
        else if (expiryDiffDays <= 7)
            freshnessStatus = "at-risk";
        else
            freshnessStatus = "fresh";
        res.json({ success: true, data: { ...lot, freshnessAge: ageDiffDays, freshnessStatus } });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch lot" });
    }
});
router.post("/:id/action", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { action, location } = req.body;
        const lot = await Lot_1.Lot.findById(req.params.id);
        if (!lot)
            return res.status(404).json({ error: "Lot not found" });
        lot.scanEvents.push({
            scannedBy: req.user.userId,
            role: req.user.role,
            location: location || "Unknown",
            timestamp: new Date(),
            action
        });
        if (action === "harvested")
            lot.status = "harvested";
        else if (action === "arrived-warehouse")
            lot.status = "in-warehouse";
        else if (action === "picked-up")
            lot.status = "in-transit";
        else if (action === "delivered")
            lot.status = "delivered";
        await lot.save();
        // Publish update to Redis
        redis_1.redisPub.publish(redis_1.CHANNELS.LOT_UPDATES, JSON.stringify({ lotId: lot._id, status: lot.status, action }));
        res.json({ success: true, data: lot });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update lot" });
    }
});
router.post("/:id/qr", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const lot = await Lot_1.Lot.findById(req.params.id);
        if (!lot)
            return res.status(404).json({ error: "Lot not found" });
        // Generate simple mock QR token
        const qrCode = `QR-${lot._id}-${Date.now()}`;
        lot.qrCode = qrCode;
        await lot.save();
        res.json({ success: true, data: { qrCode } });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate QR" });
    }
});
router.post("/scan", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { qrCode, location, action } = req.body;
        const lot = await Lot_1.Lot.findOne({ qrCode });
        if (!lot)
            return res.status(404).json({ error: "Invalid QR Code" });
        lot.scanEvents.push({
            scannedBy: req.user.userId,
            role: req.user.role,
            location: location || "Unknown",
            timestamp: new Date(),
            action
        });
        if (action === "harvested")
            lot.status = "harvested";
        else if (action === "arrived-warehouse")
            lot.status = "in-warehouse";
        else if (action === "picked-up")
            lot.status = "in-transit";
        else if (action === "delivered")
            lot.status = "delivered";
        await lot.save();
        redis_1.redisPub.publish(redis_1.CHANNELS.LOT_UPDATES, JSON.stringify({ lotId: lot._id, status: lot.status, action }));
        res.json({ success: true, data: lot });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to scan QR" });
    }
});
exports.default = router;
