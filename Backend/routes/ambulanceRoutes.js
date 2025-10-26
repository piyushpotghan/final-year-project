const express = require("express");
const router = express.Router();
const AmbulanceBooking = require("../models/AmbulanceBooking");

// ✅ Create booking (offline unpaid by default; online will be marked paid/approved after success callback)
router.post("/", async (req, res) => {
  try {
    const payload = req.body || {};

    // Normalize and guard incoming values
    const paymentMethod = (payload.paymentMethod || "offline").toLowerCase();

    const newBooking = new AmbulanceBooking({
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      pickup: payload.pickup,
      hospital: payload.hospital,
      paymentMethod: ["online", "offline"].includes(paymentMethod)
        ? paymentMethod
        : "offline",
      // Always start as Pending/Unpaid; online flow will flip these in /:id/payment
      status: "Pending",
      paymentStatus: "Unpaid",
    });
    await newBooking.save();
    res.status(201).json({ message: "Ambulance booked successfully!", booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await AmbulanceBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update status (Pending / Approved / Cancelled) — Admin action
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Pending", "Approved", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const booking = await AmbulanceBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // 🚫 Rule: Online payment bookings cannot be cancelled by anyone
    if (status === "Cancelled" && booking.paymentMethod === "online") {
      return res
        .status(400)
        .json({ error: "Online payment bookings cannot be cancelled" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update payment status (after stripe success) and auto-approve booking for online payments
router.put("/:id/payment", async (req, res) => {
  try {
    const booking = await AmbulanceBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // Mark as paid and, if online, auto-approve
    booking.paymentStatus = "Paid";
    if (booking.paymentMethod === "online") {
      booking.status = "Approved";
    }
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete booking (admin can delete regardless of payment status)
router.delete("/:id", async (req, res) => {
  try {
    const booking = await AmbulanceBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;