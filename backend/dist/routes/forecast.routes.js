"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Forecast_1 = require("../models/Forecast");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.optionalAuth, async (req, res) => {
    const { crop, region, period } = req.query;
    const filter = {};
    if (crop)
        filter.crop = crop;
    if (region)
        filter.region = region;
    if (period)
        filter.period = period;
    const forecasts = await Forecast_1.Forecast.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: forecasts });
});
exports.default = router;
