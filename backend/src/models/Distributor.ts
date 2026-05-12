import mongoose, { Document, Schema } from "mongoose";

export interface IDistributor extends Document {
  customId: string;
  name: string;
  companyName: string;
  location: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  linkedWarehouses: mongoose.Types.ObjectId[];
  linkedRetailers: mongoose.Types.ObjectId[];
  fillRate: number;
  activeShipments: number;
  contactPerson: string;
  contactPhone: string;
  status: string;
  createdAt: Date;
}

const DistributorSchema = new Schema<IDistributor>({
  customId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  linkedWarehouses: [{ type: Schema.Types.ObjectId, ref: 'Warehouse' }],
  linkedRetailers: [{ type: Schema.Types.ObjectId, ref: 'Retailer' }],
  fillRate: { type: Number, default: 0 },
  activeShipments: { type: Number, default: 0 },
  contactPerson: { type: String, required: true },
  contactPhone: { type: String, required: true },
  status: { type: String, default: "active" },
}, { timestamps: true });

export const Distributor = mongoose.model<IDistributor>("Distributor", DistributorSchema);