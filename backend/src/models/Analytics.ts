import mongoose, { Document, Schema } from "mongoose";

export interface IAnalytics extends Document {
  role: string;
  userId: string;
  metricName: string;
  value: number;
  unit: string;
  period: string;
  trend: "up" | "down" | "stable";
  createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>({
  role: { type: String, required: true },
  userId: { type: String, required: true },
  metricName: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  period: { type: String, required: true },
  trend: { type: String, enum: ["up", "down", "stable"], default: "stable" },
}, { timestamps: true });

export const Analytics = mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);