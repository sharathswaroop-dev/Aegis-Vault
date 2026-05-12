import { Router, Request, Response } from "express";
import axios from "axios";
import { WeatherCache } from "../models/WeatherCache";
import { optionalAuth } from "../middleware/auth.middleware";

const router = Router();

const REGION_COORDS: Record<string, { lat: number; lng: number }> = {
  "bangalore": { lat: 12.9716, lng: 77.5946 },
  "karnataka": { lat: 15.3173, lng: 75.7139 },
  "mysore": { lat: 12.2958, lng: 76.6394 },
  "hubli": { lat: 15.3647, lng: 75.1240 },
  "mangalore": { lat: 12.8654, lng: 74.8426 },
};

function computeCropImpacts(condition: string, humidity: number) {
  const impacts = [
    { crop: "Tomato", direction: condition.includes("Rain") ? "down" : "neutral", impact: condition.includes("Rain") ? "Supply disruption expected" : "Normal growth" },
    { crop: "Onion", direction: "neutral", impact: "Stable conditions" },
    { crop: "Mango", direction: "up", impact: "Ideal weather for ripening" },
    { crop: "Potato", direction: "neutral", impact: "Normal storage conditions" },
    { crop: "Capsicum", direction: humidity > 70 ? "down" : "neutral", impact: humidity > 70 ? "Humidity affecting yield" : "Normal growth" },
    { crop: "Coriander", direction: "up", impact: "High demand expected" },
  ];
  return impacts;
}

router.get("/live", optionalAuth, async (req: Request, res: Response) => {
  try {
    const region = req.query.region as string || "bangalore";
    const coords = REGION_COORDS[region] || REGION_COORDS["bangalore"];
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(503).json({ error: "OpenWeatherMap API key not configured" });
    }

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${apiKey}&units=metric`),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${apiKey}&units=metric&cnt=14`)
    ]);

    const current = currentRes.data;
    const forecastList = forecastRes.data.list;

    const forecast = forecastList.map((f: any) => ({
      date: f.dt_txt.split(" ")[0],
      temperature: Math.round(f.main.temp),
      humidity: f.main.humidity,
      condition: f.weather[0].main,
      impact: f.weather[0].main.includes("Rain") ? "Tomato supply disrupted - price rising 12%" : 
              f.weather[0].main.includes("Cloud") ? "Normal conditions" : "Optimal harvest window"
    }));

    const cropImpacts = computeCropImpacts(current.weather[0].main, current.main.humidity);

    res.json({
      success: true,
      region,
      data: {
        current: {
          temperature: Math.round(current.main.temp),
          humidity: current.main.humidity,
          wind: Math.round(current.wind.speed),
          condition: current.weather[0].main,
          description: current.weather[0].description,
          location: current.name
        },
        forecast,
        cropImpacts
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch live weather" });
  }
});

router.get("/", optionalAuth, async (req: Request, res: Response) => {
  try {
    const region = req.query.region as string || "bangalore";
    
    const weather = await WeatherCache.findOne({ region });
    
    if (!weather) {
      return res.status(404).json({ error: "Weather data not found. Please try again later." });
    }
    
    res.json({
      success: true,
      region,
      data: {
        current: weather.current,
        forecast: weather.forecast,
        cropImpacts: weather.cropImpacts,
        lastUpdated: weather.lastUpdated
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.get("/crop-impact", optionalAuth, async (req: Request, res: Response) => {
  try {
    const crop = req.query.crop as string;
    
    if (!crop) {
      return res.status(400).json({ error: "Crop parameter required" });
    }
    
    const weather = await WeatherCache.findOne({ region: "bangalore" });
    
    if (!weather) {
      return res.status(404).json({ error: "Weather data not available" });
    }
    
    const cropImpact = weather.cropImpacts.find(c => 
      c.crop.toLowerCase() === crop.toLowerCase()
    );
    
    res.json({
      success: true,
      crop,
      data: cropImpact || { crop, impact: "No specific impact data", direction: "neutral" }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch crop impact" });
  }
});

export default router;