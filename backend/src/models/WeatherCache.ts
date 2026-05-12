import mongoose, { Document, Schema } from "mongoose";

export interface IWeatherCache extends Document {
  region: string;
  current: {
    temperature: number;
    humidity: number;
    wind: number;
    condition: string;
    description: string;
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
  lastUpdated: Date;
}

const WeatherCacheSchema = new Schema<IWeatherCache>({
  region: { type: String, required: true, unique: true },
  current: {
    temperature: Number,
    humidity: Number,
    wind: Number,
    condition: String,
    description: String
  },
  forecast: [{
    date: String,
    temperature: Number,
    humidity: Number,
    condition: String,
    impact: String
  }],
  cropImpacts: [{
    crop: String,
    impact: String,
    direction: String
  }],
  lastUpdated: { type: Date, default: Date.now }
});

export const WeatherCache = mongoose.model<IWeatherCache>("WeatherCache", WeatherCacheSchema);