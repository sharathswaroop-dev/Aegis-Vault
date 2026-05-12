import mongoose, { Document, Schema } from "mongoose";

export interface IPrice extends Document {
  commodity: string;
  state: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceDate: Date;
  lastUpdated: Date;
}

const PriceSchema = new Schema<IPrice>({
  commodity: { type: String, required: true },
  state: { type: String, required: true },
  market: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  modalPrice: { type: Number, required: true },
  priceDate: { type: Date, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

PriceSchema.index({ commodity: 1, state: 1, market: 1, priceDate: -1 });

export const Price = mongoose.model<IPrice>("Price", PriceSchema);