import mongoose, { Document, Schema } from "mongoose";

export type LotStatus = "harvested" | "in-transit" | "in-warehouse" | "delivered" | "spoiled" | "at-risk";
export type FreshnessStatus = "fresh" | "at-risk" | "urgent";

export interface IScanEvent {
  scannedBy: string;
  role: string;
  location: string;
  timestamp: Date;
  action: string;
}

export interface ILot extends Document {
  lotId: string;
  productName: string;
  category: string;
  qty: number;
  unit: string;
  farmerId: mongoose.Types.ObjectId;
  warehouseId?: mongoose.Types.ObjectId;
  distributorId?: mongoose.Types.ObjectId;
  retailerId?: mongoose.Types.ObjectId;
  harvestDate: Date;
  expiryDate: Date;
  freshnessAge: number;
  status: LotStatus;
  freshnessStatus: FreshnessStatus;
  coldChainHealth: number;
  price: number;
  pricePerUnit: number;
  qrCode?: string;
  scanEvents: IScanEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const ScanEventSchema = new Schema<IScanEvent>({
  scannedBy: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  action: { type: String, required: true },
});

const LotSchema = new Schema<ILot>({
  lotId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  qty: { type: Number, required: true },
  unit: { type: String, required: true },
  farmerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
  distributorId: { type: Schema.Types.ObjectId, ref: 'Distributor' },
  retailerId: { type: Schema.Types.ObjectId, ref: 'Retailer' },
  harvestDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  freshnessAge: { type: Number, default: 0 },
  status: { type: String, enum: ["harvested", "in-transit", "in-warehouse", "delivered", "spoiled"], default: "harvested" },
  freshnessStatus: { type: String, enum: ["fresh", "at-risk", "urgent"], default: "fresh" },
  coldChainHealth: { type: Number, default: 100 },
  price: { type: Number, default: 0 },
  pricePerUnit: { type: Number, default: 0 },
  qrCode: { type: String },
  scanEvents: [ScanEventSchema],
}, { timestamps: true });

export const Lot = mongoose.model<ILot>("Lot", LotSchema);