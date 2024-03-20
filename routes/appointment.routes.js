const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment"); // Adjust the path as needed

// POST route for booking an appointment
router.post("/book", async (req, res) => {
  try {
    const newAppointment = new Appointment({
      patientName: req.body.patientName,
      contactEmail: req.body.contactEmail,
      appointmentDate: req.body.appointmentDate,
      serviceType: req.body.serviceType,
      // Add more fields as necessary
    });

    await newAppointment.save();
    res.status(201).send("Appointment booked successfully");
  } catch (error) {
    res.status(400).send("Error booking appointment");
  }
});

module.exports = router;
