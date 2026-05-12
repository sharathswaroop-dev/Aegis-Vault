import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const redisOptions = {
  retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000);
  },
  maxRetriesPerRequest: null,
};

// Create a single instance for caching / general commands
export const redis = new Redis(REDIS_URL, redisOptions as any);

// Create dedicated instances for pub/sub (ioredis requires separate connections for subscribe)
export const redisPub = new Redis(REDIS_URL, redisOptions as any);
export const redisSub = new Redis(REDIS_URL, redisOptions as any);

redis.on('error', (err) => console.error('Redis Client Error', err));
redis.on('connect', () => console.log('✅ Redis connected'));

export const CACHE_TTL = {
  SHORT: 60,       // 1 minute
  MEDIUM: 3600,    // 1 hour
  LONG: 86400,     // 24 hours
};

export const CHANNELS = {
  WEATHER: 'foodflow:weather',
  PRICES: 'foodflow:prices',
  SHIPMENTS: 'foodflow:shipments',
  HUBS: 'foodflow:hubs',
  ORDERS: 'foodflow:orders',
  ALERTS: 'foodflow:alerts',
  ETA: 'foodflow:eta',
  LOCATION: 'foodflow:location',
};
