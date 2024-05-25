// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { PatientProvider } from "./context/PatientContext";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import PatientFormPage from "./pages/PatientForm";
import PatientList from "./pages/PatientList/PatientList";
import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        {" "}
        {/* Move PatientProvider here to cover all routes */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/add-patient/:patientId"
              element={<PatientFormPage />}
            />
            <Route path="/add-patient" element={<PatientFormPage />} />
            <Route path="/patient-profile/:id" element={<PatientProfile />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
