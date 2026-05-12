import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cron from "node-cron";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/foodflow";

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    // Start real-time data poller after DB is ready
    const { startRealtimePoller } = await import("./lib/realtime-poller");
    startRealtimePoller().catch((e) => console.warn("Poller error:", e.message));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
import authRoutes from "./routes/auth.routes";
import lotsRoutes from "./routes/lots.routes";
import warehouseRoutes from "./routes/warehouse.routes";
import distributorRoutes from "./routes/distributor.routes";
import retailerRoutes from "./routes/retailer.routes";
import notificationRoutes from "./routes/notification.routes";
import forecastRoutes from "./routes/forecast.routes";
import analyticsRoutes from "./routes/analytics.routes";
import weatherRoutes from "./routes/weather.routes";
import priceRoutes from "./routes/price.routes";
import alertsRoutes from "./routes/alerts.routes";
import aiRoutes from "./routes/ai.routes";
import supplyChainRoutes from "./routes/supply-chain.routes";
import inventoryRoutes from "./routes/inventory.routes";
import liveRoutes from "./routes/live.routes";

app.use("/api/auth", authRoutes);
app.use("/api/lots", lotsRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/distributors", distributorRoutes);
app.use("/api/retailers", retailerRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/supply-chain", supplyChainRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/live", liveRoutes);

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// WebSocket for real-time updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  
  socket.on("subscribe", (userId: string) => {
    socket.join(`user:${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Export io for use in controllers
export { io };

import { redisSub, CHANNELS } from "./lib/redis";

// Redis Pub/Sub wiring to WebSockets
const channelValues = Object.values(CHANNELS);
redisSub.subscribe(...channelValues, (err, count) => {
  if (err) {
    console.error("Failed to subscribe to Redis channels:", err);
  } else {
    console.log(`✅ Subscribed to ${count} Redis channels`);
  }
});

redisSub.on("message", (channel, message) => {
  try {
    const data = JSON.parse(message);
    
    // Generic emit for live updates
    if (channel === CHANNELS.WEATHER) io.emit("weather-update", data);
    else if (channel === CHANNELS.PRICES) io.emit("prices-update", data);
    else if (channel === CHANNELS.SHIPMENTS) io.emit("shipments-update", data);
    else if (channel === CHANNELS.HUBS) io.emit("hubs-update", data);
    else if (channel === CHANNELS.ORDERS) io.emit("orders-update", data);
    else if (channel === CHANNELS.ALERTS) io.emit("alerts-update", data);
    else if (channel === CHANNELS.ETA) io.emit("eta-update", data);
    else if (channel === CHANNELS.LOCATION) io.emit("location-update", data);
    
    // Legacy support for specific event names
    if (channel === CHANNELS.ORDERS) io.emit("lot-updated", data);
    if (channel === CHANNELS.ALERTS) io.emit("risk-alert", data);

  } catch(e) {
    console.error("Failed to parse redis message", e);
  }
});


// Cron Jobs
import { refreshWeather, recalculateLotRisk, refreshMandiPrices } from "./lib/cron-jobs";

// Every hour - refresh weather and recalculate lot risk
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Running hourly cron: Weather & Lot Risk");
  await refreshWeather();
  await recalculateLotRisk();
});

// Every 6 hours - refresh mandi prices
cron.schedule("0 */6 * * *", async () => {
  console.log("⏰ Running 6-hour cron: Mandi Prices");
  await refreshMandiPrices();
});

// Every day at midnight - hub utilization
cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running daily cron: Hub Utilization");
  // Calculate hub utilization
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 FoodFlow API running on port ${PORT}`);
});

export default app;