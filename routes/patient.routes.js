const express = require("express");
const router = express.Router();
const Patient = require("../models/patient"); // Adjust the path as necessary

// POST route to add a new patient
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to retrieve all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route to retrieve a single patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PATCH route to update a patient's information
router.patch("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).send();
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE route to remove a patient
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
