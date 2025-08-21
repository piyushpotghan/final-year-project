const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

// ✅ Send OTP
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "🚨 Sorry! This email is not registered with Medicare Doctor Appointment System." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Medicare Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔑 Password Reset OTP - Medicare Doctor Appointment System",
      html: `
        <h2>Medicare Doctor Appointment System</h2>
        <p>Dear User,</p>
        <p>We received a request to reset your password. Please use the OTP below:</p>
        <h3 style="color:#007BFF; letter-spacing:3px;">${otp}</h3>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <p style="color:#666;">💙 Regards,<br/>Medicare Support Team</p>
      `,
    });

    res.json({
      message: "✅ OTP has been sent to your registered email. Please check your inbox/spam folder.",
    });
  } catch (err) {
    res.status(500).json({ message: "⚠️ Something went wrong while sending OTP. Please try again later." });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
      return res
        .status(400)
        .json({ message: "❌ Invalid or expired OTP. Please request a new one." });
    }
    res.json({ message: "🎉 OTP verified successfully! You can now reset your password." });
  } catch (err) {
    res.status(500).json({ message: "⚠️ Error verifying OTP. Please try again." });
  }
});

// ✅ Reset Password
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "🚨 User not found in Medicare Doctor Appointment System.",
      });

    user.password = await bcrypt.hash(password, 10);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({
      message: "🔒 Password reset successful! You can now login to Medicare Doctor Appointment System with your new credentials.",
    });
  } catch (err) {
    res.status(500).json({ message: "⚠️ Error resetting password. Please try again later." });
  }
});

module.exports = router;