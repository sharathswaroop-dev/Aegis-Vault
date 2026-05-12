"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FF_CHANNELS = void 0;
exports.startRealtimePoller = startRealtimePoller;
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("./redis");
const Lot_1 = require("../models/Lot");
const Price_1 = require("../models/Price");
const Notification_1 = require("../models/Notification");
// ─── Redis channel names ──────────────────────────────────────────────
exports.FF_CHANNELS = {
    WEATHER: "foodflow:weather",
    PRICES: "foodflow:prices",
    LOCATION: "foodflow:location",
    ORDERS: "foodflow:orders",
    ALERTS: "foodflow:alerts",
};
// ─── Helpers ──────────────────────────────────────────────────────────
async function publishAndCache(channel, data) {
    const json = JSON.stringify(data);
    await redis_1.redis.set(`cache:${channel}`, json);
    await redis_1.redisPub.publish(channel, json);
}
// ─── Weather (open-meteo — no API key) ───────────────────────────────
async function pollWeather() {
    try {
        // First grab user location
        const locRes = await axios_1.default.get("https://ipapi.co/json", { timeout: 5000 });
        const { latitude: lat, longitude: lng, city, region, country, ip } = locRes.data;
        // Then get weather for that location
        const wRes = await axios_1.default.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m&timezone=auto&forecast_days=1`, { timeout: 5000 });
        const { current_weather } = wRes.data;
        const payload = {
            temperature: current_weather.temperature,
            windspeed: current_weather.windspeed,
            weathercode: current_weather.weathercode,
            is_day: current_weather.is_day,
            city,
            region,
            country,
            ip,
            lat,
            lng,
            fetchedAt: new Date().toISOString(),
        };
        await publishAndCache(exports.FF_CHANNELS.WEATHER, payload);
        console.log(`✅ [poller] weather @ ${city}, ${current_weather.temperature}°C`);
    }
    catch (err) {
        console.warn("⚠️ [poller] weather fetch failed:", err.message);
    }
}
// ─── Location / IP info (ipwho.is — no API key) ──────────────────────
async function pollLocation() {
    try {
        const [ipapiRes, ipwhoRes] = await Promise.allSettled([
            axios_1.default.get("https://ipapi.co/json", { timeout: 5000 }),
            axios_1.default.get("https://ipwho.is", { timeout: 5000 }),
        ]);
        const ipapi = ipapiRes.status === "fulfilled" ? ipapiRes.value.data : {};
        const ipwho = ipwhoRes.status === "fulfilled" ? ipwhoRes.value.data : {};
        const payload = {
            ip: ipwho.ip || ipapi.ip,
            city: ipapi.city || ipwho.city,
            region: ipapi.region || ipwho.region,
            country: ipapi.country_name || ipwho.country,
            latitude: ipapi.latitude || ipwho.latitude,
            longitude: ipapi.longitude || ipwho.longitude,
            isp: ipwho.connection?.isp || ipwho.org || "Unknown ISP",
            org: ipwho.connection?.org || ipwho.org || "Unknown Org",
            timezone: ipapi.timezone || ipwho.timezone?.id,
            fetchedAt: new Date().toISOString(),
        };
        await publishAndCache(exports.FF_CHANNELS.LOCATION, payload);
        console.log(`✅ [poller] location → ${payload.city}, ${payload.country}`);
    }
    catch (err) {
        console.warn("⚠️ [poller] location fetch failed:", err.message);
    }
}
// ─── Live Prices from MongoDB ─────────────────────────────────────────
async function pollPrices() {
    try {
        const prices = await Price_1.Price.find().sort({ priceDate: -1 }).limit(20).lean();
        const payload = {
            prices: prices.map((p) => ({
                commodity: p.commodity,
                market: p.market,
                state: p.state,
                minPrice: p.minPrice,
                maxPrice: p.maxPrice,
                modalPrice: p.modalPrice,
                priceDate: p.priceDate,
            })),
            fetchedAt: new Date().toISOString(),
        };
        await publishAndCache(exports.FF_CHANNELS.PRICES, payload);
        console.log(`✅ [poller] prices — ${prices.length} records`);
    }
    catch (err) {
        console.warn("⚠️ [poller] prices fetch failed:", err.message);
    }
}
// ─── Live Orders from MongoDB ─────────────────────────────────────────
async function pollOrders() {
    try {
        const lots = await Lot_1.Lot.find({ status: { $nin: ["delivered", "spoiled"] } })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();
        const today = new Date();
        const payload = {
            orders: lots.map((lot) => {
                const ageMs = today.getTime() - new Date(lot.harvestDate).getTime();
                const ageDays = Math.floor(ageMs / 86400000);
                const expiryMs = new Date(lot.expiryDate).getTime() - today.getTime();
                const daysLeft = Math.ceil(expiryMs / 86400000);
                let risk = daysLeft <= 3 ? "High" : daysLeft <= 7 ? "Medium" : "Low";
                return {
                    id: lot._id,
                    sku: lot.lotId,
                    item: lot.productName,
                    category: lot.category,
                    location: `Hub ${lot.warehouseId?.toString().slice(-4) || "N/A"}`,
                    stock: `${lot.qty ?? 0} ${lot.unit ?? "units"}`,
                    age: `${ageDays} day${ageDays === 1 ? "" : "s"}`,
                    risk,
                    status: lot.status,
                    harvestDate: lot.harvestDate,
                    expiryDate: lot.expiryDate,
                    daysLeft,
                };
            }),
            fetchedAt: new Date().toISOString(),
        };
        await publishAndCache(exports.FF_CHANNELS.ORDERS, payload);
        console.log(`✅ [poller] orders — ${lots.length} active lots`);
    }
    catch (err) {
        console.warn("⚠️ [poller] orders fetch failed:", err.message);
    }
}
// ─── Live Alerts from MongoDB ─────────────────────────────────────────
async function pollAlerts() {
    try {
        const alerts = await Notification_1.Notification.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();
        const payload = {
            alerts: alerts.map((a) => ({
                id: a._id,
                type: a.type || "info",
                title: a.message.slice(0, 60),
                description: a.message,
                affected: a.relatedEntityType ? `${a.relatedEntityType}:${a.relatedEntityId}` : "System",
                timestamp: new Date(a.createdAt).toLocaleString("en-IN"),
            })),
            fetchedAt: new Date().toISOString(),
        };
        await publishAndCache(exports.FF_CHANNELS.ALERTS, payload);
        console.log(`✅ [poller] alerts — ${alerts.length} notifications`);
    }
    catch (err) {
        console.warn("⚠️ [poller] alerts fetch failed:", err.message);
    }
}
// ─── Run all pollers once, then every 60 seconds ──────────────────────
async function startRealtimePoller() {
    console.log("🔄 Starting real-time data poller...");
    // Run all pollers immediately on boot
    await Promise.allSettled([
        pollWeather(),
        pollLocation(),
        pollPrices(),
        pollOrders(),
        pollAlerts(),
    ]);
    // Then repeat every 60 seconds
    setInterval(async () => {
        await Promise.allSettled([
            pollWeather(),
            pollLocation(),
            pollPrices(),
            pollOrders(),
            pollAlerts(),
        ]);
    }, 60000);
}
