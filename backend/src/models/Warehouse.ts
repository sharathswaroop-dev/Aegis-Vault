import mongoose, { Document, Schema } from "mongoose";

export interface IWarehouse extends Document {
  customId: string;
  name: string;
  location: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  capacity: number;
  utilized: number;
  utilizationPercent: number;
  temperature: number;
  humidity: number;
  healthScore: number;
  linkedFarmers: mongoose.Types.ObjectId[];
  linkedDistributors: mongoose.Types.ObjectId[];
  status: string;
  createdAt: Date;
}

const WarehouseSchema = new Schema<IWarehouse>({
  customId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  capacity: { type: Number, required: true },
  utilized: { type: Number, default: 0 },
  utilizationPercent: { type: Number, default: 0 },
  temperature: { type: Number, default: 4 },
  humidity: { type: Number, default: 65 },
  healthScore: { type: Number, default: 100 },
  linkedFarmers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  linkedDistributors: [{ type: Schema.Types.ObjectId, ref: 'Distributor' }],
  status: { type: String, default: "active" },
}, { timestamps: true });

export const Warehouse = mongoose.model<IWarehouse>("Warehouse", WarehouseSchema);