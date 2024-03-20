const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
