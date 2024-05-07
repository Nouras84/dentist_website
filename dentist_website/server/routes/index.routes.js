const express = require("express");
const router = express.Router();

// Importing individual route modules
const patientRoutes = require("./patient.routes");
const userRoutes = require("./user.routes");

// Use the imported routes
router.use("/patients", patientRoutes);
router.use("/users", userRoutes);

// Export the router
module.exports = router;
