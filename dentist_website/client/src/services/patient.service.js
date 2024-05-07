// services/patient.service.js
import axios from "axios";

const API_URL = "http://localhost:5005"; // Adjust based on your server URL

const getPatientList = async () => {
  try {
    const response = await axios.get(`${API_URL}/patients`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions for other patient-related operations as needed

export { getPatientList };
