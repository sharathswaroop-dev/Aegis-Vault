"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Distributor_1 = require("../models/Distributor");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const distributors = await Distributor_1.Distributor.find();
    res.json({ success: true, data: distributors });
});
exports.default = router;
