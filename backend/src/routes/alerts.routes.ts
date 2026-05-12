import { Router } from "express";
import { Notification } from "../models/Notification";

const router = Router();

router.post("/whatsapp", async (req, res) => {
  const { to, message } = req.body;
  // In production: Twilio client.messages.create({...})
  const notification = await Notification.create({
    userId: to,
    role: "farmer",
    message,
    type: "info",
    channel: "whatsapp",
    sentViaWhatsapp: true,
    whatsappStatus: "sent"
  });
  res.json({ success: true, data: notification });
});

router.post("/sms", async (req, res) => {
  const { to, message } = req.body;
  const notification = await Notification.create({
    userId: to,
    role: "farmer", 
    message,
    type: "info",
    channel: "sms",
    sentViaSms: true,
    smsStatus: "sent"
  });
  res.json({ success: true, data: notification });
});

router.get("/history", async (req, res) => {
  const { userId } = req.query;
  const notifications = await Notification.find({ 
    userId, 
    $or: [{ sentViaWhatsapp: true }, { sentViaSms: true }]
  }).sort({ createdAt: -1 });
  res.json({ success: true, data: notifications });
});

export default router;