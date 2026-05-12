"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Price_1 = require("../models/Price");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.optionalAuth, async (req, res) => {
    const { commodity, state } = req.query;
    const filter = {};
    if (commodity)
        filter.commodity = commodity;
    if (state)
        filter.state = state;
    const prices = await Price_1.Price.find(filter).sort({ priceDate: -1 }).limit(30);
    res.json({ success: true, data: prices });
});
router.get("/comparison", auth_middleware_1.optionalAuth, async (req, res) => {
    const { farmerId, crop } = req.query;
    res.json({ success: true, data: { farmerPrice: 2400, mandiPrice: 2600, gap: "+8.3%" } });
});
exports.default = router;
