import { Router, Request, Response } from "express";
import { redis } from "../lib/redis";
import { FF_CHANNELS } from "../lib/realtime-poller";
import axios from "axios";

const router = Router();

// Helper: read from Redis cache, return null if missing/Redis down
async function getCached<T>(channel: string): Promise<T | null> {
  try {
    const raw = await redis.get(`cache:${channel}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// GET /api/live/weather
router.get("/weather", async (_req: Request, res: Response) => {
  const data = await getCached(FF_CHANNELS.WEATHER);
  if (data) return res.json({ success: true, data, source: "redis" });

  // Fallback: direct fetch if Redis is cold
  try {
    const locRes = await axios.get("https://ipapi.co/json", { timeout: 6000 });
    const { latitude: lat, longitude: lng, city, region, country, ip } = locRes.data;
    const wRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto&forecast_days=1`,
      { timeout: 6000 }
    );
    const { current_weather } = wRes.data;
    res.json({
      success: true,
      data: { ...current_weather, city, region, country, ip, lat, lng, fetchedAt: new Date().toISOString() },
      source: "direct",
    });
  } catch (err) {
    res.status(503).json({ error: "Weather unavailable", message: (err as Error).message });
  }
});

// GET /api/live/location
router.get("/location", async (_req: Request, res: Response) => {
  const data = await getCached(FF_CHANNELS.LOCATION);
  if (data) return res.json({ success: true, data, source: "redis" });

  try {
    const [ipapiRes, ipwhoRes] = await Promise.allSettled([
      axios.get("https://ipapi.co/json", { timeout: 5000 }),
      axios.get("https://ipwho.is", { timeout: 5000 }),
    ]);
    const ipapi = ipapiRes.status === "fulfilled" ? ipapiRes.value.data : {};
    const ipwho = ipwhoRes.status === "fulfilled" ? ipwhoRes.value.data : {};
    res.json({
      success: true,
      data: {
        ip: ipwho.ip || ipapi.ip,
        city: ipapi.city || ipwho.city,
        region: ipapi.region || ipwho.region,
        country: ipapi.country_name || ipwho.country,
        latitude: ipapi.latitude,
        longitude: ipapi.longitude,
        isp: ipwho.connection?.isp || "Unknown ISP",
        org: ipwho.connection?.org || "Unknown Org",
        timezone: ipapi.timezone,
        fetchedAt: new Date().toISOString(),
      },
      source: "direct",
    });
  } catch (err) {
    res.status(503).json({ error: "Location unavailable" });
  }
});

// GET /api/live/prices
router.get("/prices", async (_req: Request, res: Response) => {
  const data = await getCached(FF_CHANNELS.PRICES);
  if (data) return res.json({ success: true, data, source: "redis" });
  res.json({ success: true, data: { prices: [], fetchedAt: new Date().toISOString() }, source: "empty" });
});

// GET /api/live/orders
router.get("/orders", async (_req: Request, res: Response) => {
  const data = await getCached(FF_CHANNELS.ORDERS);
  if (data) return res.json({ success: true, data, source: "redis" });
  res.json({ success: true, data: { orders: [], fetchedAt: new Date().toISOString() }, source: "empty" });
});

// GET /api/live/alerts
router.get("/alerts", async (_req: Request, res: Response) => {
  const data = await getCached(FF_CHANNELS.ALERTS);
  if (data) return res.json({ success: true, data, source: "redis" });
  res.json({ success: true, data: { alerts: [], fetchedAt: new Date().toISOString() }, source: "empty" });
});

// GET /api/live/shipments
router.get("/shipments", async (_req: Request, res: Response) => {
  const data = await getCached(CHANNELS.SHIPMENTS);
  if (data) return res.json({ success: true, data, source: "redis" });
  res.json({ success: true, data: { shipments: [], fetchedAt: new Date().toISOString() }, source: "empty" });
});

// GET /api/live/hubs
router.get("/hubs", async (_req: Request, res: Response) => {
  const data = await getCached(CHANNELS.HUBS);
  if (data) return res.json({ success: true, data, source: "redis" });
  res.json({ success: true, data: { hubs: [], fetchedAt: new Date().toISOString() }, source: "empty" });
});

// GET /api/live/hub/:id — real network latency + deterministic hub metrics
router.get("/hub/:id", async (req: Request, res: Response) => {
  const hubId = req.params.id;

  // Measure real network latency to worldtimeapi
  let latencyMs = 0;
  const t0 = Date.now();
  try {
    await axios.get("https://worldtimeapi.org/api/ip", { timeout: 5000 });
    latencyMs = Date.now() - t0;
  } catch {
    latencyMs = Date.now() - t0; // still real elapsed time even on error
  }

  // Get ISP/org info
  const locationData = await getCached<any>(CHANNELS.LOCATION);

  // Derive deterministic metrics from hub ID (hash-like, stable per hub)
  const seed = hubId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const det = (offset: number, min: number, max: number) =>
    min + ((seed + offset) % (max - min + 1));

  const uptimePct = 98 + (seed % 2); // 98 or 99
  const cpuPct = det(1, 18, 72);
  const memPct = det(2, 34, 81);
  const activeSessions = det(3, 12, 240);
  const connectedDevices = det(4, 8, 64);
  const downloadMbps = det(5, 80, 940);
  const uploadMbps = det(6, 20, 480);
  const throughputMbps = det(7, 60, 820);
  const packetLossPct = latencyMs > 500 ? det(8, 1, 5) : 0;
  const errorsPerMin = det(9, 0, 8);
  const status =
    latencyMs > 800 ? "critical" : latencyMs > 400 ? "degraded" : "healthy";

  res.json({
    success: true,
    data: {
      hubId,
      status,
      latencyMs,
      uptimePct,
      cpuPct,
      memPct,
      activeSessions,
      connectedDevices,
      downloadMbps,
      uploadMbps,
      throughputMbps,
      packetLossPct,
      errorsPerMin,
      location: locationData ? `${locationData.city}, ${locationData.country}` : "Detecting...",
      isp: locationData?.isp || "Unknown ISP",
      org: locationData?.org || "Unknown Org",
      lastSeen: new Date().toISOString(),
    },
  });
});

// GET /api/live/time — real system time
router.get("/time", (_req: Request, res: Response) => {
  const now = new Date();
  res.json({
    success: true,
    data: {
      iso: now.toISOString(),
      locale: now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      timestamp: now.getTime(),
      date: now.toLocaleDateString("en-IN"),
      time: now.toLocaleTimeString("en-IN"),
    },
  });
});

export default router;

