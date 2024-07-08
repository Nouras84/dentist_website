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

// Correct use of uploadProfile middleware for routes needing single file upload
router.patch("/:id/update-patient", uploadProfile, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log("req file:", req.file);

  try {
    // If the nome is in the update data, check for existing patients with the same nome
    if (updateData.nome) {
      const existingPatient = await Patient.findOne({
        nome: updateData.nome,
        _id: { $ne: id },
      });
      if (existingPatient) {
        return res
          .status(409)
          .send({ message: "Error: A patient with this name already exists." });
      }
    }

    // Handle file upload
    if (req.file) {
      updateData.profilePhoto = {
        path: req.file,
        description: updateData.profilePhotoDescription,
      };
    }

    // Perform the update
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

// update profile picture
const multerForPp = require("multer");
const upload = multerForPp({ dest: "uploads/" });
router.post(
  "/:id/upload-profile-picture",
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const filePath = req.file.path;

      const patient = await Patient.findByIdAndUpdate(
        id,
        {
          profilePhoto: {
            path: filePath,
          },
        },
        { new: true }
      );

      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }

      console.log("Updated patient:", patient);

      res.status(200).send({
        message: "Profile picture uploaded and updated successfully",
        patient,
      });
    } catch (error) {
      console.error("Failed to update patient:", error);
      res
        .status(500)
        .send({ message: "Internal server error", details: error.message });
    }
  }
);

// Route for adding or updating treatment data for a patient
router.patch(
  "/:patientId/:tratamentoId/tratamento-executado",
  async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.patientId);
      const tratamentoId = req.params.tratamentoId;

      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }

      const updatedTreatmentData = req.body.patientDataOnEdit;

      console.log("patient:", patient.nome);
      console.log("updated treatment data:", updatedTreatmentData);

      const treatment = patient.tratamentosExecutados.id(tratamentoId);
      console.log("treatment:", treatment);
      if (!treatment) {
        return res.status(404).send({ message: "Treatment not found" });
      }

      Object.keys(updatedTreatmentData).forEach((key) => {
        treatment[key] = updatedTreatmentData[key];
      });

      await patient.save();
      console.log("treatment:", treatment);

      res.status(200).send({
        message: "Treatment updated successfully",
        data: treatment,
      });
    } catch (error) {
      console.error("Error updating treatments:", error);
      res
        .status(500)
        .send({ error: "Internal server error", details: error.message });
    }
  }
);

// PATCH route to update a specific procedure of a patient
router.patch("/:id/procedimento", async (req, res) => {
  console.log(
    "Received data for procedures:",
    JSON.stringify(req.body, null, 2)
  );
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    // Replace the existing procedimentos array with the new one
    patient.procedimentos = req.body.procedimentos;

    await patient.save();
    console.log(
      "Updated patient data:",
      JSON.stringify(patient.procedimentos, null, 2)
    );
    res.status(200).send(patient);
  } catch (error) {
    console.error("Error updating procedures:", error);
    res.status(400).send(error);
  }
});

// PATCH route to update photographs for a patient
router.patch("/:id/fotografias", uploadPhotographs, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    console.log("Received file name:", req.body.fileName); // Log the file name received

    const photo = {
      path: req.files[0].path,
      nome: req.body.fileName, // Store the file name
      description: req.body.description,
    };

    patient.fotografias.push(photo);
    await patient.save();

    res.status(200).send({
      message: "Photo added successfully",
      photo: patient.fotografias[patient.fotografias.length - 1],
    });
  } catch (error) {
    console.error("Error adding photo:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// DELETE route to remove a specific photograph from a patient
router.delete("/:id/fotografias/:photoId", async (req, res) => {
  try {
    const { id, photoId } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    // Find the index of the photo to remove
    const photoIndex = patient.fotografias.findIndex(
      (photo) => photo._id.toString() === photoId
    );

    if (photoIndex === -1) {
      return res.status(404).send("Photo not found");
    }

    // Remove the photo from the array
    patient.fotografias.splice(photoIndex, 1);
    await patient.save();

    res
      .status(200)
      .send({ message: "Photo deleted successfully", data: patient });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res
      .status(500)
      .send({ message: "Internal server error", details: error.message });
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

router.get("/:patientId/treatments", async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    console.log("patientId:", patientId);
    console.log("finded patient:", patient.tratamentosExecutados);

    res
      .status(200)
      .json({ tratamentoExecutado: patient.tratamentosExecutados });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});
router.post("/:patientId/treatments", async (req, res) => {
  try {
    const { patientId } = req.params;
    const { tratamentoExecutadoData } = req.body;

    console.log("patientId:", patientId);
    console.log("treatment information:", tratamentoExecutadoData);

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ errorMessage: "Patient not found" });
    }

    patient.tratamentosExecutados.unshift(tratamentoExecutadoData);

    await patient.save();

    res
      .status(200)
      .json({ tratamentoExecutado: patient.tratamentosExecutados });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

router.delete(
  "/:patientId/:tratamentoId/tratamento-executado",
  async (req, res) => {
    try {
      const { patientId, tratamentoId } = req.params;

      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).send({ message: "Patient not found" });
      }

      const index = patient.tratamentosExecutados.findIndex(
        (treatment) => treatment._id.toString() === tratamentoId
      );

      if (index === -1) {
        return res.status(404).send({ message: "Treatment not found" });
      }

      patient.tratamentosExecutados.splice(index, 1);
      await patient.save();

      res.status(200).send({
        message: "Treatment deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting treatment:", error);
      res
        .status(500)
        .send({ error: "Internal server error", details: error.message });
    }
  }
);

module.exports = router;
