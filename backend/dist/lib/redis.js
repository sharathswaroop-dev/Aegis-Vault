"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNELS = exports.CACHE_TTL = exports.redisSub = exports.redisPub = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisOptions = {
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
    maxRetriesPerRequest: null,
};
// Create a single instance for caching / general commands
exports.redis = new ioredis_1.default(REDIS_URL, redisOptions);
// Create dedicated instances for pub/sub (ioredis requires separate connections for subscribe)
exports.redisPub = new ioredis_1.default(REDIS_URL, redisOptions);
exports.redisSub = new ioredis_1.default(REDIS_URL, redisOptions);
exports.redis.on('error', (err) => console.error('Redis Client Error', err));
exports.redis.on('connect', () => console.log('✅ Redis connected'));
exports.CACHE_TTL = {
    SHORT: 60, // 1 minute
    MEDIUM: 3600, // 1 hour
    LONG: 86400, // 24 hours
};
exports.CHANNELS = {
    LOT_UPDATES: 'lot_updates',
    RISK_ALERTS: 'risk_alerts',
    DELIVERY_STATUS: 'delivery_status',
    NOTIFICATIONS: 'notifications'
};
