const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// ✅ Register User
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// ✅ Forgot Password - Send OTP with Message
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML Template
    const htmlTemplate = `
      <div style="font-family:Arial, sans-serif; line-height:1.5; color:#333;">
        <h2 style="color:#2b6cb0;">Medicare - Doctor Appointment System</h2>
        <p>Hello,</p>
        <p>You recently requested to reset your password for your <b>Medicare</b> account.</p>
        <p>Please use the following One-Time Password (OTP) to reset your password:</p>
        <h3 style="color:#d53f8c;">${otp}</h3>
        <p><b>Note:</b> This OTP will expire in 10 minutes.</p>
        <br/>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <p>Thanks,<br/>Medicare Support Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Medicare Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Medicare Password Reset OTP",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
      html: htmlTemplate,
    });

    res.json({ message: "OTP sent to email with instructions" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
});

// ✅ Reset Password
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
});

module.exports = router;