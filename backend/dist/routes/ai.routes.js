"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openai_1 = __importDefault(require("openai"));
const Lot_1 = require("../models/Lot");
const WeatherCache_1 = require("../models/WeatherCache");
const Price_1 = require("../models/Price");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
router.post("/chat", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?.userId;
        const role = req.user?.role;
        const lots = await Lot_1.Lot.find({ farmerId: userId }).limit(5);
        const weather = await WeatherCache_1.WeatherCache.findOne({ region: "bangalore" });
        const prices = await Price_1.Price.find({ commodity: "Tomato" }).sort({ priceDate: -1 }).limit(5);
        const context = `User is a ${role} with the following data:
    Lots: ${JSON.stringify(lots.map(l => ({ lotId: l.lotId, product: l.productName, status: l.status })))}
    Weather: ${weather?.current?.condition || "Unknown"}
    Tomato Prices: ${prices.map(p => p.modalPrice).join(", ")}`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: `You are a FoodFlow AI assistant. ${context}` },
                { role: "user", content: message }
            ]
        });
        res.json({ success: true, response: completion.choices[0].message.content });
    }
    catch (error) {
        res.status(500).json({ error: "AI chat failed" });
    }
});
router.get("/insights", auth_middleware_1.optionalAuth, async (req, res) => {
    try {
        const role = req.query.role || req.user?.role;
        const userId = req.user?.userId;
        const lots = await Lot_1.Lot.find({ farmerId: userId }).limit(10);
        const weather = await WeatherCache_1.WeatherCache.findOne({ region: "bangalore" });
        const insights = [
            `Tomato demand rising ${weather?.current?.condition === "Clear" ? "12%" : "5%"} due to weather conditions`,
            `${lots.filter(l => l.freshnessStatus === "at-risk").length} lots are at risk - consider urgent pickup`,
            "Price forecast: Tomato prices expected to rise 8% next 7 days"
        ];
        res.json({ success: true, data: insights });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate insights" });
    }
});
exports.default = router;
