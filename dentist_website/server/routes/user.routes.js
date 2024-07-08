const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path as necessary
const router = express.Router();
const Patients = require("../models/patient");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  console.log(user, !user); // Debugging: Log the user object

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  if (bcrypt.compareSync(password, user.password)) {
    req.session.userId = user._id; // Create a session
    res.send("Logged in successfully");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out, please try again.");
    }
    res.send("Logged out successfully");
  });
});

module.exports = router;
