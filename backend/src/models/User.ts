import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type Role = "farmer" | "warehouse" | "distributor" | "retailer" | "admin";

export interface IUser extends Document {
  customId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  linkedPartners: mongoose.Types.ObjectId[];
  location: string;
  phone?: string;
  whatsappEnabled: boolean;
  smsEnabled: boolean;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  customId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["farmer", "warehouse", "distributor", "retailer", "admin"], required: true },
  linkedPartners: [{ type: Schema.Types.ObjectId }],
  location: { type: String, required: true },
  phone: { type: String },
  whatsappEnabled: { type: Boolean, default: true },
  smsEnabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);