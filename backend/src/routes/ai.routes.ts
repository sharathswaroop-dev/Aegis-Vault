import { Router } from "express";
import { optionalAuth } from "../middleware/auth.middleware";
import { Lot } from "../models/Lot";

const router = Router();

// AI routes are disabled when OPENAI_API_KEY is not set
const AI_ENABLED = Boolean(process.env.OPENAI_API_KEY);

router.post("/chat", optionalAuth, async (req: any, res) => {
  if (!AI_ENABLED) {
    return res.status(503).json({ error: "AI service not configured" });
  }
  try {
    // Dynamic import to avoid crash on missing key
    const OpenAI = require("openai").default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    res.json({ success: true, response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI chat failed" });
  }
});

router.get("/insights", optionalAuth, async (req: any, res) => {
  try {
    const userId = req.user?.userId;
    const lots = await Lot.find({ farmerId: userId }).limit(10);
    const atRisk = lots.filter((l) => l.freshnessStatus === "at-risk").length;
    const urgent = lots.filter((l) => l.freshnessStatus === "urgent").length;

    const insights = [
      `${lots.length} lots being tracked — ${atRisk} at risk, ${urgent} urgent`,
      `Data as of ${new Date().toLocaleString("en-IN")}`,
      "Refresh every 60 seconds for latest status",
    ];
    res.json({ success: true, data: insights });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

export default router;