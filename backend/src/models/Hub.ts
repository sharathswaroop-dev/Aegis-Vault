import mongoose, { Document, Schema } from "mongoose";

export interface IHub extends Document {
  hubId: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
  };
  capacity: number; // in tons
  currentUtilization: number; // in tons
  staffCount: number;
  tempZones: {
    ambient: number;
    cold: number;
    frozen: number;
  };
  equipment: {
    forklifts: number;
    dockDoors: number;
    conveyors: number;
  };
  status: "active" | "maintenance" | "full";
  createdAt: Date;
  updatedAt: Date;
}

const HubSchema = new Schema<IHub>({
  hubId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  capacity: { type: Number, required: true },
  currentUtilization: { type: Number, default: 0 },
  staffCount: { type: Number, default: 0 },
  tempZones: {
    ambient: { type: Number, default: 25 },
    cold: { type: Number, default: 4 },
    frozen: { type: Number, default: -18 },
  },
  equipment: {
    forklifts: { type: Number, default: 5 },
    dockDoors: { type: Number, default: 10 },
    conveyors: { type: Number, default: 2 },
  },
  status: { type: String, enum: ["active", "maintenance", "full"], default: "active" },
}, { timestamps: true });

export const Hub = mongoose.model<IHub>("Hub", HubSchema);
