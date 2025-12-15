const Appointment = require("../models/Appointments"); // Load the Appointment model so we can use it

// Create a new appointment
exports.createAppointment = async (req, res) => { // Function to handle creating appointments
  try { // Try to run this code
    const newAppointment = new Appointment(req.body); // Make a new appointment using data sent from the user
    await newAppointment.save(); // Save the appointment in the database
    res.status(201).json(newAppointment); // Send back the created appointment as a response
  } catch (error) { // If something goes wrong
    res.status(500).json({ message: "Failed to create appointment" }); // Send an error message
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => { // Function to get all appointments
  try { // Try to run this code
    const appointments = await Appointment.find(); // Find all appointments in the database
    res.status(200).json(appointments); // Send the list of appointments
  } catch (error) { // If something goes wrong
    res.status(500).json({ message: "Failed to fetch appointments" }); // Send an error message
  }
};

// Add or update prescription for an appointment
exports.addPrescription = async (req, res) => { // Function to add/update prescription
  try { // Try to run this code
    console.log('Prescription request body:', req.body); // Log the data we received
    const { appointmentId, prescription } = req.body; // Get appointmentId and prescription from the request

    const appointment = await Appointment.findById(appointmentId); // Find the appointment by ID
    if (!appointment) { // If no appointment is found
      console.log('Appointment not found for ID:', appointmentId); // Log that it wasn't found
      return res.status(404).json({ message: "Appointment not found" }); // Send a 404 error
    }

    if (!Array.isArray(prescription)) { // Check if prescription is an array
      return res.status(400).json({ message: "Prescription must be an array" }); // Send an error if it's not
    }

    appointment.prescription = prescription; // Update the prescription in the appointment
    await appointment.save(); // Save the updated appointment
    console.log('Prescription saved for appointment:', appointmentId); // Log success

    res.status(200).json({ message: "Prescription added", appointment }); // Send success response
  } catch (error) { // If something goes wrong
    console.error('Error in addPrescription:', error); // Log the error
    res.status(500).json({ message: "Failed to add prescription", error: error.message }); // Send an error message
  }
};
