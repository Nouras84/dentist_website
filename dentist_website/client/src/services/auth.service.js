// services/auth.service.js
import axios from "axios";

const API_URL = "http://localhost:5005"; // Adjust based on your server URL

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

const logout = async () => {
  // Logout logic (if any interaction with the server is required)
};

export { login, logout };
