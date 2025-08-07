const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ GET: All Verified Doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor"});

    // Merge doctorInfo into one object for frontend
    const formatted = doctors.map(doc => ({
      id: doc._id,
      name: doc.username,
      email: doc.email,
      ...doc.doctorInfo,
      reviews: doc.reviews || []
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

module.exports = router;
