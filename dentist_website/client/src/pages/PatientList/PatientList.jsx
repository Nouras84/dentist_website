// import React, { useEffect, useState } from "react";
// import { getPatientList } from "../../services/patient.service"; // Note the adjusted path
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
//       console.log(data); // Check what the data looks like
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
//       <input
//         type="text"
//         placeholder="Search patients..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul>
//         {patients
//           .filter(
//             (patient) =>
//               patient.name &&
//               typeof patient.name === "string" &&
//               patient.name.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//           .map((patient) => (
//             <li key={patient.id}>{patient.name}</li>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default PatientList;

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
//               patient.name &&
//               typeof patient.name === "string" &&
//               patient.name.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//           .map((patient) => (
//             <li key={patient._id}>{patient.name}</li>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default PatientList;

import React, { useEffect, useState } from "react";
import { getPatientList } from "../../services/patient.service"; // Adjust path as needed
import "./PatientList.css"; // Ensure the CSS file is in the correct directory

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const data = await getPatientList();
      console.log("Fetched patients:", data); // Check what the data looks like
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients");
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Patients</h1>
      <label htmlFor="searchPatients">Search Patients:</label>
      <input
        id="searchPatients" // Unique identifier for the input
        name="search" // Name that will be used to identify the field when the form data is submitted
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {patients
          .filter(
            (patient) =>
              patient.nome && // Ensure that nome is not undefined or null
              typeof patient.nome === "string" &&
              patient.nome.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((patient) => (
            <li key={patient._id}>{patient.nome}</li> // Use `patient.nome` instead of `patient.name`
          ))}
      </ul>
    </div>
  );
}

export default PatientList;
