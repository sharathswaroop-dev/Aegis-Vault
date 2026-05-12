import mongoose, { Document, Schema } from "mongoose";

export type NotificationType = "success" | "warning" | "danger" | "info" | "action";
export type AlertChannel = "whatsapp" | "sms" | "in-app" | "both";

export interface INotification extends Document {
  userId: string;
  role: string;
  message: string;
  type: NotificationType;
  channel: AlertChannel;
  relatedEntityId?: string;
  relatedEntityType?: string;
  read: boolean;
  sentViaWhatsapp: boolean;
  sentViaSms: boolean;
  whatsappStatus?: string;
  smsStatus?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["success", "warning", "danger", "info", "action"], default: "info" },
  channel: { type: String, enum: ["whatsapp", "sms", "in-app", "both"], default: "in-app" },
  relatedEntityId: { type: String },
  relatedEntityType: { type: String },
  read: { type: Boolean, default: false },
  sentViaWhatsapp: { type: Boolean, default: false },
  sentViaSms: { type: Boolean, default: false },
  whatsappStatus: { type: String },
  smsStatus: { type: String },
}, { timestamps: true });

export const Notification = mongoose.model<INotification>("Notification", NotificationSchema);