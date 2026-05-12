"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), role: user.role, name: user.name }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
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
    }
    catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});
router.get("/me", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get user" });
    }
});
exports.default = router;
