const express = require("express");
const router = express.Router();

// Import other route modules
const appointmentRoutes = require("./appointment.routes");

// Use the appointment routes
router.use("/api/appointments", appointmentRoutes); // Added leading slash

module.exports = router;
