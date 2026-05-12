import axios from "axios";
import { redis, redisPub, CHANNELS } from "./redis";
import { Lot, Price, Notification, Hub, Shipment } from "../models";

// ─── Helpers ──────────────────────────────────────────────────────────
async function publishAndCache(channel: string, data: object) {
  const json = JSON.stringify(data);
  await redis.set(`cache:${channel}`, json);
  await redisPub.publish(channel, json);
}

// ─── Weather (open-meteo — no API key) ───────────────────────────────
async function pollWeather() {
  try {
    const locRes = await axios.get("https://ipapi.co/json", { timeout: 5000 });
    const { latitude: lat, longitude: lng, city, region, country, ip } = locRes.data;

    const wRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m&timezone=auto&forecast_days=1`,
      { timeout: 5000 }
    );
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

    await publishAndCache(CHANNELS.WEATHER, payload);
    console.log(`✅ [poller] weather @ ${city}, ${current_weather.temperature}°C`);
  } catch (err) {
    console.warn("⚠️ [poller] weather fetch failed:", (err as Error).message);
  }
}

// ─── Location / IP info (ipwho.is — no API key) ──────────────────────
async function pollLocation() {
  try {
    const [ipapiRes, ipwhoRes] = await Promise.allSettled([
      axios.get("https://ipapi.co/json", { timeout: 5000 }),
      axios.get("https://ipwho.is", { timeout: 5000 }),
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

    await publishAndCache(CHANNELS.LOCATION, payload);
    console.log(`✅ [poller] location → ${payload.city}, ${payload.country}`);
  } catch (err) {
    console.warn("⚠️ [poller] location fetch failed:", (err as Error).message);
  }
}

// ─── Live Prices (data.gov.in) ────────────────────────────────────────
async function pollPrices() {
  try {
    // Attempt to hit data.gov.in resource
    const res = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?format=json&limit=50",
      { timeout: 8000 }
    );
    
    if (res.data && res.data.records) {
      const payload = {
        prices: res.data.records.map((r: any) => ({
          commodity: r.commodity,
          market: r.market,
          state: r.state,
          minPrice: parseFloat(r.min_price),
          maxPrice: parseFloat(r.max_price),
          modalPrice: parseFloat(r.modal_price),
          priceDate: r.arrival_date,
        })),
        fetchedAt: new Date().toISOString(),
      };
      await publishAndCache(CHANNELS.PRICES, payload);
      console.log(`✅ [poller] prices (live) — ${res.data.records.length} records`);
    } else {
      // Fallback to MongoDB
      const prices = await Price.find().sort({ priceDate: -1 }).limit(20).lean();
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
      await publishAndCache(CHANNELS.PRICES, payload);
      console.log(`✅ [poller] prices (db) — ${prices.length} records`);
    }
  } catch (err) {
    console.warn("⚠️ [poller] prices fetch failed:", (err as Error).message);
  }
}

// ─── Shipments (MongoDB + Redis) ─────────────────────────────────────
async function pollShipments() {
  try {
    const shipments = await Shipment.find({ status: { $ne: "delivered" } })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const payload = {
      shipments: shipments.map((s) => ({
        id: s._id,
        shipmentId: s.shipmentId,
        vehicleId: s.vehicleId,
        driver: s.driverName,
        origin: s.origin,
        destination: s.destination,
        status: s.status,
        tons: s.tonsLoaded,
        eta: s.eta,
        gps: s.gpsLocation,
        speed: s.speed,
        temp: s.tempLog?.[s.tempLog.length - 1]?.temperature || 0,
      })),
      fetchedAt: new Date().toISOString(),
    };
    await publishAndCache(CHANNELS.SHIPMENTS, payload);
    
    // Also publish first shipment to ETA channel for active tracking simulation
    if (shipments.length > 0) {
      await publishAndCache(CHANNELS.ETA, payload.shipments[0]);
    }
    
    console.log(`✅ [poller] shipments — ${shipments.length} active`);
  } catch (err) {
    console.warn("⚠️ [poller] shipments fetch failed:", (err as Error).message);
  }
}

// ─── Hub Utilization (MongoDB) ────────────────────────────────────────
async function pollHubs() {
  try {
    const hubs = await Hub.find().lean();
    const payload = {
      hubs: hubs.map((h) => ({
        id: h._id,
        hubId: h.hubId,
        name: h.name,
        location: h.location.city,
        capacity: h.capacity,
        utilization: h.currentUtilization,
        utilizationPct: (h.currentUtilization / h.capacity) * 100,
        staff: h.staffCount,
        status: h.status,
      })),
      fetchedAt: new Date().toISOString(),
    };
    await publishAndCache(CHANNELS.HUBS, payload);
    console.log(`✅ [poller] hubs — ${hubs.length} active`);
  } catch (err) {
    console.warn("⚠️ [poller] hubs fetch failed:", (err as Error).message);
  }
}

// ─── Live Orders from MongoDB ─────────────────────────────────────────
async function pollOrders() {
  try {
    const lots = await Lot.find({ status: { $nin: ["delivered", "spoiled"] } })
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
        let risk: "Low" | "Medium" | "High" =
          daysLeft <= 3 ? "High" : daysLeft <= 7 ? "Medium" : "Low";

        return {
          id: lot._id,
          sku: lot.lotId,
          item: lot.productName,
          category: lot.category,
          location: `Hub ${lot.warehouseId?.toString().slice(-4) || "N/A"}`,
          stock: `${lot.qty ?? 0} Tons`,
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
    await publishAndCache(CHANNELS.ORDERS, payload);
    console.log(`✅ [poller] orders — ${lots.length} active lots`);
  } catch (err) {
    console.warn("⚠️ [poller] orders fetch failed:", (err as Error).message);
  }
}

// ─── Live Alerts from MongoDB ─────────────────────────────────────────
async function pollAlerts() {
  try {
    const alerts = await Notification.find()
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
    await publishAndCache(CHANNELS.ALERTS, payload);
    console.log(`✅ [poller] alerts — ${alerts.length} notifications`);
  } catch (err) {
    console.warn("⚠️ [poller] alerts fetch failed:", (err as Error).message);
  }
}

// ─── Run all pollers once, then every 60 seconds ──────────────────────
export async function startRealtimePoller() {
  console.log("🔄 Starting real-time data poller...");

  const runAll = async () => {
    await Promise.allSettled([
      pollWeather(),
      pollLocation(),
      pollPrices(),
      pollOrders(),
      pollAlerts(),
      pollShipments(),
      pollHubs(),
    ]);
  };

  await runAll();
  setInterval(runAll, 60_000);
}
