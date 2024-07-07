const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path as necessary
const router = express.Router();
const Patients = require("../models/patient");

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username: username });
//   console.log(user); // Debugging: Log the user object to see if it's being fetched correctly
//   console.log(bcrypt.compareSync(password, user.password));

//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     return res.status(401).send("Invalid credentials");
//   }
//   req.session.userId = user._id; // Create a session
//   res.send("Logged in successfully");
// });

// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.send("Logged out successfully");
// });

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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patients.findById(id);

    console.log("founded patient:", patient);

    res.status(200).json(patient);
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

module.exports = router;
