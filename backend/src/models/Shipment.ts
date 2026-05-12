import mongoose, { Document, Schema } from "mongoose";

export interface IShipmentStop {
  location: string;
  lat: number;
  lng: number;
  timestamp: Date;
  status: "pending" | "arrived" | "departed";
}

export interface ITempLog {
  timestamp: Date;
  temperature: number;
}

export interface IShipment extends Document {
  shipmentId: string;
  vehicleId: string;
  driverName: string;
  carrier: string;
  origin: string;
  destination: string;
  status: "scheduled" | "dispatched" | "in-transit" | "delivered" | "delayed";
  tonsLoaded: number;
  tonsDelivered?: number;
  variance?: number;
  productName: string;
  batchCode: string;
  sku: string;
  category: string;
  gpsLocation: {
    lat: number;
    lng: number;
  };
  speed: number; // km/h
  tempLog: ITempLog[];
  stops: IShipmentStop[];
  dispatchedAt?: Date;
  eta: Date;
  deliveredAt?: Date;
  delayReason?: string;
  supplierId: mongoose.Types.ObjectId;
  onTime: boolean;
  inFull: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentSchema = new Schema<IShipment>({
  shipmentId: { type: String, required: true, unique: true },
  vehicleId: { type: String, required: true },
  driverName: { type: String, required: true },
  carrier: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ["scheduled", "dispatched", "in-transit", "delivered", "delayed"], default: "scheduled" },
  tonsLoaded: { type: Number, required: true },
  tonsDelivered: { type: Number },
  variance: { type: Number },
  productName: { type: String, required: true },
  batchCode: { type: String, required: true },
  sku: { type: String, required: true },
  category: { type: String, required: true },
  gpsLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  speed: { type: Number, default: 0 },
  tempLog: [{
    timestamp: { type: Date, default: Date.now },
    temperature: { type: Number, required: true },
  }],
  stops: [{
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    timestamp: { type: Date },
    status: { type: String, enum: ["pending", "arrived", "departed"], default: "pending" },
  }],
  dispatchedAt: { type: Date },
  eta: { type: Date, required: true },
  deliveredAt: { type: Date },
  delayReason: { type: String },
  supplierId: { type: Schema.Types.ObjectId, ref: 'User' },
  onTime: { type: Boolean, default: true },
  inFull: { type: Boolean, default: true },
}, { timestamps: true });

export const Shipment = mongoose.model<IShipment>("Shipment", ShipmentSchema);
