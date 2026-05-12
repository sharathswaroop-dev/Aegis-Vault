import mongoose, { Document, Schema } from "mongoose";

export interface IRetailer extends Document {
  customId: string;
  storeName: string;
  ownerName: string;
  location: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  linkedDistributor: mongoose.Types.ObjectId;
  salesVelocity: number;
  inventory: { productName: string; qty: number; unit: string }[];
  contactPhone: string;
  status: string;
  createdAt: Date;
}

const RetailerSchema = new Schema<IRetailer>({
  customId: { type: String, required: true, unique: true },
  storeName: { type: String, required: true },
  ownerName: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  linkedDistributor: { type: Schema.Types.ObjectId, ref: 'Distributor', required: true },
  salesVelocity: { type: Number, default: 0 },
  inventory: [{
    productName: String,
    qty: Number,
    unit: String
  }],
  contactPhone: { type: String, required: true },
  status: { type: String, default: "active" },
}, { timestamps: true });

export const Retailer = mongoose.model<IRetailer>("Retailer", RetailerSchema);