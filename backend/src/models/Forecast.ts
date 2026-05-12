import mongoose, { Document, Schema } from "mongoose";

export interface IForecast extends Document {
  crop: string;
  region: string;
  demandQty: number;
  period: "7d" | "30d" | "90d";
  seasonalLift?: number;
  weatherImpact?: string;
  weatherAdvantage?: "advantage" | "disadvantage" | "neutral";
  eventName?: string;
  eventDate?: string;
  priceImpact?: number;
  mlConfidence?: number;
  createdAt: Date;
}

const ForecastSchema = new Schema<IForecast>({
  crop: { type: String, required: true },
  region: { type: String, required: true },
  demandQty: { type: Number, required: true },
  period: { type: String, enum: ["7d", "30d", "90d"], required: true },
  seasonalLift: { type: Number },
  weatherImpact: { type: String },
  weatherAdvantage: { type: String, enum: ["advantage", "disadvantage", "neutral"] },
  eventName: { type: String },
  eventDate: { type: String },
  priceImpact: { type: Number },
  mlConfidence: { type: Number },
}, { timestamps: true });

export const Forecast = mongoose.model<IForecast>("Forecast", ForecastSchema);