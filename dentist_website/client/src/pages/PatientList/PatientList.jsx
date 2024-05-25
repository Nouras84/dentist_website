// import React, { useEffect, useState } from "react";
// import { getPatientList } from "../../services/patient.service"; // Adjust path as needed
// import "./PatientList.css"; // Ensure the CSS file is in the correct directory

// function PatientList() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   async function fetchPatients() {
//     try {
//       const data = await getPatientList();
//       console.log("Fetched patients:", data); // Check what the data looks like
//       setPatients(data);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//       setError("Failed to fetch patients");
//     }
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Patients</h1>
//       <label htmlFor="searchPatients">Search Patients:</label>
//       <input
//         id="searchPatients" // Unique identifier for the input
//         name="search" // Name that will be used to identify the field when the form data is submitted
//         type="text"
//         placeholder="Search patients..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul>
//         {patients
//           .filter(
//             (patient) =>
//               patient.nome && // Ensure that nome is not undefined or null
//               typeof patient.nome === "string" &&
//               patient.nome.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//           .map((patient) => (
//             <li key={patient._id}>{patient.nome}</li> // Use `patient.nome` instead of `patient.name`
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default PatientList;
// pages/PatientList/index.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientList.css"; // Ensure the CSS file is in the correct directory

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5005/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients", error);
        setError("Failed to fetch patients");
      }
    };

    fetchPatients();
  }, []);

  const handlePatientClick = (id) => {
    navigate(`/patient-profile/${id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Patients</h1>
      <label htmlFor="searchPatients">Search Patients:</label>
      <input
        id="searchPatients"
        name="search"
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {patients
          .filter(
            (patient) =>
              patient.nome &&
              typeof patient.nome === "string" &&
              patient.nome.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((patient) => (
            <li
              key={patient._id}
              onClick={() => handlePatientClick(patient._id)}
            >
              {patient.nome}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PatientList;
