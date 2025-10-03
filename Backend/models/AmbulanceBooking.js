const mongoose = require("mongoose");

const ambulanceBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pickup: { type: String, required: true },
  hospital: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending", // default Pending
  },
});

module.exports = mongoose.model("AmbulanceBooking", ambulanceBookingSchema);