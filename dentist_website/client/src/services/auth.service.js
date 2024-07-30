// // services/auth.service.js
// import axios from "axios";

// const API_URL = "http://localhost:5005"; // Adjust based on your server URL

// const login = async (userData) => {
//   const response = await axios.post(`${API_URL}/users/login`, userData);
//   return response.data;
// };

// const logout = async () => {
//   // Logout logic (if any interaction with the server is required)
// };

// export { login, logout };
import axios from "axios";

const API_URL = "http://localhost:5005"; // Adjust based on your server URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

const login = async (userData) => {
  const response = await axiosInstance.post("/users/login", userData);
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.get("/users/logout");
  return response.data;
};

const checkLoginStatus = async () => {
  const response = await axiosInstance.get("/users/check-login");
  return response.data;
};

export { login, logout, checkLoginStatus };
