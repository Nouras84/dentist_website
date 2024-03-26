const express = require("express");
const router = express.Router();

// Importing individual route modules
const patientRoutes = require("./patient.routes");

// Use the imported routes
router.use("/patients", patientRoutes);

// Export the router
module.exports = router;
