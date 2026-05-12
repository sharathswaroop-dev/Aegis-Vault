import axios from "axios";
import { Lot } from "../models/Lot";
import { Warehouse } from "../models/Warehouse";
import { WeatherCache } from "../models/WeatherCache";
import { Price } from "../models/Price";
import { Notification } from "../models/Notification";
import { redisPub, CHANNELS } from "./redis";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const REGION_COORDS: Record<string, { lat: number; lng: number }> = {
  "bangalore": { lat: 12.9716, lng: 77.5946 },
  "karnataka": { lat: 15.3173, lng: 75.7139 },
  "mysore": { lat: 12.2958, lng: 76.6394 },
  "hubli": { lat: 15.3647, lng: 75.1240 },
  "mangalore": { lat: 12.8654, lng: 74.8426 },
};

export async function refreshWeather() {
  if (!OPENWEATHER_API_KEY) {
    console.log("⚠️ OpenWeather API key not configured");
    return;
  }

  try {
    const region = "bangalore";
    const coords = REGION_COORDS[region];
    
    const currentRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=14`
    );

    const current = currentRes.data;
    const forecastList = forecastRes.data.list;

    const forecast = forecastList.map((f: any) => ({
      date: f.dt_txt.split(" ")[0],
      temperature: Math.round(f.main.temp),
      humidity: f.main.humidity,
      condition: f.weather[0].main,
      impact: getWeatherImpact(f.weather[0].main, f.main.temp)
    }));

    const cropImpacts = computeCropImpacts(current.weather[0].main, current.main.humidity);

    await WeatherCache.findOneAndUpdate(
      { region },
      {
        region,
        current: {
          temperature: Math.round(current.main.temp),
          humidity: current.main.humidity,
          wind: Math.round(current.wind.speed),
          condition: current.weather[0].main,
          description: current.weather[0].description
        },
        forecast,
        cropImpacts,
        lastUpdated: new Date()
      },
      { upsert: true }
    );

    console.log("✅ Weather refreshed for", region);
  } catch (error) {
    console.error("❌ Weather refresh failed:", (error as Error).message);
  }
}

function getWeatherImpact(condition: string, temp: number): string {
  if (condition.includes("Rain") || condition.includes("Thunderstorm")) {
    if (temp > 25) return "Tomato supply disrupted - price rising";
    return "Leafy vegetables wilting - urgent harvest";
  }
  if (condition === "Clear" && temp > 30) {
    return "Onion yield down 8% - demand outpacing supply";
  }
  return "Normal conditions expected";
}

function computeCropImpacts(condition: string, humidity: number) {
  const impacts = [
    { crop: "Tomato", direction: condition.includes("Rain") ? "down" : "neutral" as const, impact: condition.includes("Rain") ? "Supply disruption expected" : "Normal growth" },
    { crop: "Onion", direction: "neutral" as const, impact: "Stable conditions" },
    { crop: "Mango", direction: "up" as const, impact: "Ideal weather for ripening" },
    { crop: "Potato", direction: "neutral" as const, impact: "Normal storage conditions" },
    { crop: "Capsicum", direction: humidity > 70 ? "down" as const : "neutral" as const, impact: humidity > 70 ? "Humidity affecting yield" : "Normal growth" },
    { crop: "Coriander", direction: "up" as const, impact: "High demand expected" },
  ];
  return impacts;
}

export async function recalculateLotRisk() {
  const lots = await Lot.find({ status: { $nin: ["delivered", "spoiled"] } });
  
  for (const lot of lots) {
    const now = new Date();
    const ageMs = now.getTime() - new Date(lot.harvestDate).getTime();
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    
    const expiryMs = new Date(lot.expiryDate).getTime() - now.getTime();
    const daysUntilExpiry = Math.floor(expiryMs / (1000 * 60 * 60 * 24));
    const maxAgeMs = new Date(lot.expiryDate).getTime() - new Date(lot.harvestDate).getTime();
    const maxAgeDays = Math.floor(maxAgeMs / (1000 * 60 * 60 * 24));
    
    const freshnessPercent = ((maxAgeDays - ageDays) / maxAgeDays) * 100;
    
    let freshnessStatus: "fresh" | "at-risk" | "urgent" = "fresh";
    if (freshnessPercent <= 30 || daysUntilExpiry <= 2) freshnessStatus = "urgent";
    else if (freshnessPercent <= 60 || daysUntilExpiry <= 4) freshnessStatus = "at-risk";
    
    const wasAtRisk = lot.freshnessStatus === "at-risk" || lot.freshnessStatus === "urgent";
    const isNowAtRisk = freshnessStatus === "at-risk" || freshnessStatus === "urgent";
    
    lot.freshnessAge = ageDays;
    lot.freshnessStatus = freshnessStatus;
    
    if (isNowAtRisk && !wasAtRisk) {
      await Notification.create({
        userId: lot.farmerId,
        role: "farmer",
        message: `Lot ${lot.lotId} (${lot.productName}) is now at risk! ${daysUntilExpiry} days until expiry.`,
        type: "danger",
        channel: "both",
        relatedEntityId: lot._id.toString(),
        relatedEntityType: "lot"
      });
      
      redisPub.publish(CHANNELS.RISK_ALERTS, JSON.stringify({
        ownerId: lot.farmerId,
        lotId: lot.lotId,
        productName: lot.productName,
        status: freshnessStatus
      }));
    }
    
    await lot.save();
  }
  
  console.log(`✅ Recalculated risk for ${lots.length} lots`);
}

export async function refreshMandiPrices() {
  // In production, this would fetch from Agmarknet API
  // For now, we'll use mock data
  const mockPrices = [
    { commodity: "Tomato", state: "Karnataka", market: "Bangalore", minPrice: 1800, maxPrice: 2800, modalPrice: 2400 },
    { commodity: "Onion", state: "Karnataka", market: "Bangalore", minPrice: 1400, maxPrice: 2000, modalPrice: 1800 },
    { commodity: "Potato", state: "Karnataka", market: "Bangalore", minPrice: 900, maxPrice: 1400, modalPrice: 1200 },
    { commodity: "Mango", state: "Karnataka", market: "Mysore", minPrice: 3500, maxPrice: 4500, modalPrice: 4000 },
    { commodity: "Capsicum", state: "Karnataka", market: "Bangalore", minPrice: 2500, maxPrice: 3500, modalPrice: 3000 },
    { commodity: "Coriander", state: "Karnataka", market: "Bangalore", minPrice: 4000, maxPrice: 6000, modalPrice: 5000 },
  ];
  
  for (const price of mockPrices) {
    await Price.create({
      ...price,
      priceDate: new Date(),
      lastUpdated: new Date()
    });
  }
  
  console.log("✅ Mandi prices refreshed");
}