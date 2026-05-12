"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const node_cron_1 = __importDefault(require("node-cron"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
exports.io = io;
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/foodflow";
mongoose_1.default.connect(MONGODB_URI)
    .then(async () => {
    console.log("✅ MongoDB connected");
    // Start real-time data poller after DB is ready
    const { startRealtimePoller } = await Promise.resolve().then(() => __importStar(require("./lib/realtime-poller")));
    startRealtimePoller().catch((e) => console.warn("Poller error:", e.message));
})
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const lots_routes_1 = __importDefault(require("./routes/lots.routes"));
const warehouse_routes_1 = __importDefault(require("./routes/warehouse.routes"));
const distributor_routes_1 = __importDefault(require("./routes/distributor.routes"));
const retailer_routes_1 = __importDefault(require("./routes/retailer.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const forecast_routes_1 = __importDefault(require("./routes/forecast.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const weather_routes_1 = __importDefault(require("./routes/weather.routes"));
const price_routes_1 = __importDefault(require("./routes/price.routes"));
const alerts_routes_1 = __importDefault(require("./routes/alerts.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const supply_chain_routes_1 = __importDefault(require("./routes/supply-chain.routes"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
const live_routes_1 = __importDefault(require("./routes/live.routes"));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/lots", lots_routes_1.default);
app.use("/api/warehouses", warehouse_routes_1.default);
app.use("/api/distributors", distributor_routes_1.default);
app.use("/api/retailers", retailer_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
app.use("/api/forecast", forecast_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/weather", weather_routes_1.default);
app.use("/api/prices", price_routes_1.default);
app.use("/api/alerts", alerts_routes_1.default);
app.use("/api/ai", ai_routes_1.default);
app.use("/api/supply-chain", supply_chain_routes_1.default);
app.use("/api/inventory", inventory_routes_1.default);
app.use("/api/live", live_routes_1.default);
// Health Check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});
// WebSocket for real-time updates
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("subscribe", (userId) => {
        socket.join(`user:${userId}`);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
const redis_1 = require("./lib/redis");
// Redis Pub/Sub wiring to WebSockets
redis_1.redisSub.subscribe(redis_1.CHANNELS.LOT_UPDATES, redis_1.CHANNELS.RISK_ALERTS, redis_1.CHANNELS.DELIVERY_STATUS, redis_1.CHANNELS.NOTIFICATIONS, (err, count) => {
    if (err) {
        console.error("Failed to subscribe to Redis channels:", err);
    }
    else {
        console.log(`✅ Subscribed to ${count} Redis channels`);
    }
});
redis_1.redisSub.on("message", (channel, message) => {
    console.log(`Received message on channel ${channel}:`, message);
    try {
        const data = JSON.parse(message);
        if (channel === redis_1.CHANNELS.LOT_UPDATES) {
            io.emit("lot-updated", data);
        }
        else if (channel === redis_1.CHANNELS.RISK_ALERTS) {
            if (data.ownerId)
                io.to(`user:${data.ownerId}`).emit("risk-alert", data);
            else
                io.emit("risk-alert", data);
        }
        else if (channel === redis_1.CHANNELS.NOTIFICATIONS) {
            if (data.userId)
                io.to(`user:${data.userId}`).emit("notification", data);
        }
        else if (channel === redis_1.CHANNELS.DELIVERY_STATUS) {
            io.emit("delivery-status", data);
        }
    }
    catch (e) {
        console.error("Failed to parse redis message", e);
    }
});
// Cron Jobs
const cron_jobs_1 = require("./lib/cron-jobs");
// Every hour - refresh weather and recalculate lot risk
node_cron_1.default.schedule("0 * * * *", async () => {
    console.log("⏰ Running hourly cron: Weather & Lot Risk");
    await (0, cron_jobs_1.refreshWeather)();
    await (0, cron_jobs_1.recalculateLotRisk)();
});
// Every 6 hours - refresh mandi prices
node_cron_1.default.schedule("0 */6 * * *", async () => {
    console.log("⏰ Running 6-hour cron: Mandi Prices");
    await (0, cron_jobs_1.refreshMandiPrices)();
});
// Every day at midnight - hub utilization
node_cron_1.default.schedule("0 0 * * *", async () => {
    console.log("⏰ Running daily cron: Hub Utilization");
    // Calculate hub utilization
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 FoodFlow API running on port ${PORT}`);
});
exports.default = app;
