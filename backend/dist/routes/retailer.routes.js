"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Retailer_1 = require("../models/Retailer");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const retailers = await Retailer_1.Retailer.find();
    res.json({ success: true, data: retailers });
});
exports.default = router;
