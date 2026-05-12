import { Router, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role, name: user.name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );
    
    res.json({
      success: true,
      token,
      user: {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        phone: user.phone,
        whatsappEnabled: user.whatsappEnabled,
        smsEnabled: user.smsEnabled
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/me", authenticate, async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

export default router;