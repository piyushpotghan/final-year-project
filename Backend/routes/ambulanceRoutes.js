const express = require("express");
const router = express.Router();
const AmbulanceBooking = require("../models/AmbulanceBooking");

// ✅ Create booking (offline or unpaid by default)
router.post("/", async (req, res) => {
  try {
    const newBooking = new AmbulanceBooking(req.body);
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

// ✅ Update status (approve / cancel)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await AmbulanceBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update payment status (after stripe success)
router.put("/:id/payment", async (req, res) => {
  try {
    const booking = await AmbulanceBooking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "Paid" },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await AmbulanceBooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;