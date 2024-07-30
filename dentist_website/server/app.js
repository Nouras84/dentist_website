// // Load environment variables
// require("dotenv").config();

// // Connect to the database
// require("./db/index");

// const express = require("express");
// const app = express();

// // Load app configurations (middleware, etc.)
// require("./config")(app);

// // Centralized route handling
// const indexRoutes = require("./routes/index.routes");
// app.use("/", indexRoutes);

// // Include other routes as needed
// // const authRoutes = require('./routes/auth.routes');
// // app.use('/auth', authRoutes);

// // Error handling
// require("./error-handling")(app);

// module.exports = app;

// // Load environment variables
// require("dotenv").config();

// // Connect to the database
// require("./db/index");

// const express = require("express");
// const session = require("express-session"); // Import express-session

// const app = express();

// app.use("/uploads", express.static("uploads"));

// // Configure express-session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET, // Use a secure, environment variable for the secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set to true if using HTTPS
//   })
// );

// // Load app configurations (middleware, etc.)
// require("./config")(app);

// // Centralized route handling
// const indexRoutes = require("./routes/index.routes");
// app.use("/", indexRoutes);

// // Include other routes as needed
// // const authRoutes = require('./routes/auth.routes');
// // app.use('/auth', authRoutes);

// const userRoutes = require("./routes/user.routes");
// app.use("/users", userRoutes);

// // Error handling
// require("./error-handling")(app);

// module.exports = app;
// Load environment variables
require("dotenv").config();

// Connect to the database
require("./db/index");

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use("/uploads", express.static("uploads"));

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a secure, environment variable for the secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// CORS configuration
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true, // Allow credentials (cookies)
  })
);

// Load app configurations (middleware, etc.)
require("./config")(app);

// Centralized route handling
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// Error handling
require("./error-handling")(app);

module.exports = app;
