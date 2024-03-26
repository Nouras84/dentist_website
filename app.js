// Load environment variables
require("dotenv").config();

// Connect to the database
require("./db/index");

const express = require("express");
const app = express();

// Load app configurations (middleware, etc.)
require("./config")(app);

// Centralized route handling
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// Include other routes as needed
// const authRoutes = require('./routes/auth.routes');
// app.use('/auth', authRoutes);

// Error handling
require("./error-handling")(app);

module.exports = app;
