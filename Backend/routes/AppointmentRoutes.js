const express = require("express");
const router = express.Router();

const { addPrescription } = require("../controllers/AppointmentController");
const Appointment = require("../models/Appointments");
const AmbulanceBooking = require("../models/AmbulanceBooking");

// ✅ Create new appointment (Prevent duplicates)
router.post("/create", async (req, res) => {
  try {
    const { patientEmail, doctorEmail, date, time } = req.body;

    const existing = await Appointment.findOne({
      patientEmail,
      doctorEmail,
      date,
      time,
    });

    if (existing) {
      return res.status(400).json({ error: "This slot is already booked" });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// ✅ Get all appointments (Admin)
router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createAt: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get appointments for patient by email
router.get("/", async (req, res) => {
  const { email } = req.query;
  console.log("Fetching appointments for patient email:", email);

  try {
    const appointments = await Appointment.find({ patientEmail: email }).sort({
      date: 1,
      time: 1,
    });
    res.status(200).json(appointments);
  } catch (err) {
    console.log("Error fetching appointments:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✅ Get appointments for doctor by doctorEmail
router.get("/doctor", async (req, res) => {
  const { email } = req.query;
  console.log("Fetching appointments for doctor email:", email);

  try {
    const appointments = await Appointment.find({ doctorEmail: email }).sort({
      date: 1,
      time: 1,
    });
    res.status(200).json(appointments);
  } catch (err) {
    console.log("Error fetching doctor's appointments:", err);
    res.status(500).json({ error: "Failed to fetch doctor's appointments" });
  }
});

// ✅ Update appointment status (Doctor/Admin)
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // 🚫 Prevent update if already Cancelled
    if (appointment.status === "Cancelled") {
      return res
        .status(400)
        .json({ error: "Cancelled appointment cannot be updated" });
    }

    // 🚫 Prevent update if already Completed
    if (appointment.status === "Completed") {
      return res
        .status(400)
        .json({ error: "Completed appointment cannot be updated further" });
    }

    // ✅ Allowed transitions:
    // Pending → Approved/Cancelled
    // Approved → Completed
    if (
      (appointment.status === "Pending" &&
        (status === "Approved" || status === "Cancelled")) ||
      (appointment.status === "Approved" && status === "Completed")
    ) {
      appointment.status = status;
      await appointment.save();

      // 🔁 Auto-approve related ambulance booking when appointment is approved
      if (status === "Approved") {
        try {
          await AmbulanceBooking.findOneAndUpdate(
            { name: appointment.patientName, status: "Pending" },
            { $set: { status: "Approved" } },
            { sort: { createdAt: -1 } }
          );
        } catch (ambErr) {
          console.warn("Ambulance auto-approve skipped:", ambErr?.message || ambErr);
        }
      }

      return res.status(200).json(appointment);
    }

    // 🚫 Any other transition not allowed
    return res.status(400).json({ error: "Invalid status update" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ✅ Cancel appointment (Patient)
router.put("/cancel/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Already cancelled? Just return it
    if (appointment.status === "Cancelled") {
      return res.json(appointment);
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled permanently", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to cancel appointment", error: err });
  }
});

// ✅ Delete appointment
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Appointment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
});

// ✅ Add prescription
router.put("/prescription", addPrescription);

module.exports = router;