"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    wind: number;
    condition: string;
    description: string;
    location: string;
  };
  forecast: {
    date: string;
    temperature: number;
    humidity: number;
    condition: string;
    impact: string;
  }[];
  cropImpacts: {
    crop: string;
    impact: string;
    direction: "up" | "down" | "neutral";
  }[];
}

interface WeatherWidgetProps {
  compact?: boolean;
}

export function WeatherWidget({ compact = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/weather/live?region=bangalore");
      const data = await res.json();
      if (data.success) {
        setWeather(data.data);
      } else {
        setError(data.error || "Failed to load weather");
      }
    } catch (err) {
      setError("Weather service unavailable");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain") || condition.includes("Drizzle")) return CloudRain;
    if (condition.includes("Cloud") || condition.includes("Overcast")) return Cloud;
    if (condition.includes("Clear") || condition.includes("Sun")) return Sun;
    return Sun;
  };

  const getDirectionIcon = (direction: string) => {
    if (direction === "up") return TrendingUp;
    if (direction === "down") return TrendingDown;
    return Minus;
  };

  if (loading) {
    return (
      <div className="surface-card rounded-lg p-4 animate-pulse">
        <div className="h-20 bg-[#F7F8F4] rounded" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="surface-card rounded-lg p-4 border border-amber-200 bg-amber-50">
        <p className="text-sm text-amber-700">{error || "Weather data unavailable"}</p>
        <button onClick={fetchWeather} className="text-xs text-amber-600 underline mt-1">
          Retry
        </button>
      </div>
    );
  }

  const Icon = getWeatherIcon(weather.current.condition);

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2 surface-card rounded-lg">
        <Icon className="size-6 text-amber-500" />
        <div>
          <p className="text-lg font-semibold text-[#111827]">{weather.current.temperature}°C</p>
          <p className="text-xs text-[#6B7280]">{weather.current.condition}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#111827]">Weather — Karnataka</h3>
          <p className="text-sm text-[#6B7280]">{weather.current.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="size-8 text-amber-500" />
          <span className="text-2xl font-bold text-[#111827]">{weather.current.temperature}°C</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-2 bg-[#F7F8F4] rounded-lg">
          <Droplets className="size-4 mx-auto text-blue-500 mb-1" />
          <p className="text-sm font-medium text-[#111827]">{weather.current.humidity}%</p>
          <p className="text-xs text-[#6B7280]">Humidity</p>
        </div>
        <div className="text-center p-2 bg-[#F7F8F4] rounded-lg">
          <Wind className="size-4 mx-auto text-gray-500 mb-1" />
          <p className="text-sm font-medium text-[#111827]">{weather.current.wind} km/h</p>
          <p className="text-xs text-[#6B7280]">Wind</p>
        </div>
        <div className="text-center p-2 bg-[#F7F8F4] rounded-lg">
          <Thermometer className="size-4 mx-auto text-red-500 mb-1" />
          <p className="text-sm font-medium text-[#111827]">{weather.current.description}</p>
          <p className="text-xs text-[#6B7280]">Conditions</p>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-4">
        <h4 className="text-sm font-semibold text-[#111827] mb-2">Crop Impact</h4>
        <div className="space-y-2">
          {weather.cropImpacts.map((crop) => (
            <div key={crop.crop} className="flex items-center justify-between">
              <span className="text-sm text-[#111827]">{crop.crop}</span>
              <div className="flex items-center gap-1">
                {getDirectionIcon(crop.direction)({ className: "size-3", style: {} }) as any}
                <span className={cn(
                  "text-xs font-medium",
                  crop.direction === "up" ? "text-green-600" : 
                  crop.direction === "down" ? "text-red-600" : "text-[#6B7280]"
                )}>
                  {crop.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!compact && weather.forecast.length > 0 && (
        <div className="border-t border-[#E5E7EB] pt-4 mt-4">
          <h4 className="text-sm font-semibold text-[#111827] mb-2">14-Day Forecast</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {weather.forecast.slice(0, 7).map((day, idx) => (
              <div key={idx} className="flex-shrink-0 text-center p-2 bg-[#F7F8F4] rounded-lg min-w-[60px]">
                <p className="text-xs text-[#6B7280]">{day.date.slice(5)}</p>
                <p className="text-sm font-medium text-[#111827]">{day.temperature}°</p>
                <p className="text-xs text-[#6B7280] truncate">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}