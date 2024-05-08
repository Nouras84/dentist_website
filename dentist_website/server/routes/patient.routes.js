const express = require("express");
const multer = require("multer");
// const upload = multer({ storage: storage }).single("profilePhoto");

const path = require("path");
const router = express.Router();
const Patient = require("../models/patient");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Configure multer for profile photo uploads
const uploadProfile = multer({ storage: storage }).single("profilePhoto");

// Configure multer for uploading other photographs
const uploadPhotographs = multer({ storage: storage }).array("photograph", 10); // Adjust '10' based on the max number of files allowed

// Update dental history------
router.patch("/:id/dental-history", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    patient.historicoBucal = { ...patient.historicoBucal, ...req.body };
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id/general-info", async (req, res) => {
  console.log("Received data for general info update:", req.body);
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    // Assuming informacoesGerais is already an object on the patient
    Object.assign(patient.informacoesGerais, req.body);
    patient.markModified("informacoesGerais"); // Important: This tells Mongoose that the path has been modified

    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.error("Error updating patient information:", error);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: error.message });
  }
});

router.patch("/:id/procedimento", async (req, res) => {
  console.log("Received data for procedures:", req.body);
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    patient.procedimentos.push(req.body.procedimentos[0]); // Make sure you are pushing the right object structure
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.error("Error updating procedures:", error);
    res.status(400).send(error);
  }
});

// Correct use of uploadProfile middleware for routes needing single file upload
router.patch("/:id/update-patient", uploadProfile, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If file is uploaded, include it in the update
    if (req.file) {
      updateData.profilePhoto = {
        path: req.file.path,
        description: updateData.profilePhotoDescription,
      };
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).send({ message: "Patient not found." });
    }
    res.status(200).send(updatedPatient);
  } catch (error) {
    console.error("Failed to update patient:", error);
    res
      .status(500)
      .send({ message: "Internal server error", details: error.message });
  }
});

// Ensure no duplicate or overlapping route definitions
// Example: Check if any other route accidentally handles the same path

// Route for adding or updating treatment data for a patient
router.patch("/:id/add-treatment", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    // Assuming req.body contains the treatment data
    patient.tratamentosExecutados.push(req.body);
    await patient.save();

    res
      .status(200)
      .send({ message: "Treatment added successfully", data: patient });
  } catch (error) {
    console.error("Error adding treatment:", error);
    res
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

// PATCH route to update a specific procedure of a patient
router.patch("/:patientId/procedimento/:procedureIndex", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient || !patient.procedimentos[req.params.procedureIndex]) {
      return res.status(404).send("Patient or procedure not found");
    }
    patient.procedimentos.set(req.params.procedureIndex, req.body);
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE route to remove a specific photograph from a patient
router.delete("/:id/photograph/:filename", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    const updatedFotografias = patient.fotografias.filter(
      (photo) => !photo.includes(req.params.filename)
    );
    patient.fotografias = updatedFotografias;
    await patient.save();

    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add-patient", uploadProfile, async (req, res) => {
  try {
    const patientData = {
      ...req.body,
      profilePhoto: req.file
        ? {
            path: req.file.path,
            description: req.body.profilePhotoDescription,
          }
        : undefined,
    };

    const newPatient = new Patient(patientData);
    await newPatient.save();
    res.status(201).send(newPatient);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// File: routes/patient.js
router.post("/create-empty-patient", async (req, res) => {
  try {
    const newPatient = new Patient({});
    await newPatient.save();
    res.status(201).send({ patientId: newPatient._id });
  } catch (error) {
    console.error("Error creating empty patient record:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET route to check if a patient name already exists
router.get("/check-name", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res
      .status(400)
      .send({ message: "Nome do paciente é necessário para verificação." });
  }

  try {
    const patient = await Patient.findOne({ nome: name });
    if (patient) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Erro ao verificar o nome do paciente", error);
    res.status(500).send({
      message: "Erro interno do servidor ao verificar o nome do paciente.",
      error: error.message,
    });
  }
});

// POST route for uploading photographs under the "fotografias" tab
router.post("/:id/photographs", uploadPhotographs, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    const photographs = req.files.map((file) => ({
      path: file.path,
      description: req.body.description, // Ensure this handles multiple descriptions appropriately
    }));

    patient.fotografias.push(...photographs);
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// GET route to retrieve all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    console.log("Patients data:", patients);
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

// DELETE route to remove a specific procedure from a patient
router.delete("/:patientId/procedimento/:procedureIndex", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient || !patient.procedimentos[req.params.procedureIndex]) {
      return res.status(404).send("Patient or procedure not found");
    }
    patient.procedimentos.splice(req.params.procedureIndex, 1);
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// File: routes/patient.js

router.post("/:id/tratamento-executado", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }
    // Assuming tratamentosExecutados is an array in your patient schema
    patient.tratamentosExecutados.push(req.body);
    await patient.save();
    res
      .status(201)
      .send({ message: "Treatment added successfully", data: patient });
  } catch (error) {
    console.error("Error adding treatment:", error);
    res
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

// Search route - make sure this comes before the '/:id' route
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.search; // Get the search query from query parameters
    let queryCondition = {};

    if (searchQuery) {
      // Search by CPF or name using a regular expression for flexibility
      queryCondition = {
        $or: [
          { nome: { $regex: searchQuery, $options: "i" } },
          { cpf: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const patients = await Patient.find(queryCondition);

    if (patients.length === 0) {
      // No results found
      return res
        .status(404)
        .send({ message: "No patients found matching the criteria." });
    }

    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    console.log("Search Query:", searchQuery); // Log the search query

    let queryCondition = {};

    if (searchQuery) {
      queryCondition = {
        $or: [
          { nome: { $regex: searchQuery, $options: "i" } },
          { cpf: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    console.log("Query Condition:", queryCondition); // Log the query condition

    const patients = await Patient.find(queryCondition);
    console.log("Patients Found:", patients); // Log the found patients

    if (patients.length === 0) {
      return res
        .status(404)
        .send({ message: "No patients found matching the criteria." });
    }

    res.status(200).send(patients);
  } catch (error) {
    console.error("Search Route Error:", error); // Detailed error log
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  // ... implementation ...
});

module.exports = router;
