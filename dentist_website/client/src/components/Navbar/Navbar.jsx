// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth.context";
// import "./Navbar.css";

// function Navbar() {
//   const { isLoggedIn, handleLogout } = useContext(AuthContext);

//   const handleSearch = (event) => {
//     event.preventDefault();
//     console.log("Search functionality to be implemented");
//   };

//   return (
//     <nav
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         padding: "10px",
//         borderBottom: "1px solid #ddd",
//       }}
//     >
//       <div>
//         <Link to="/" style={{ marginRight: "10px" }}>
//           Patient List
//         </Link>
//         <Link to="/add-patient">Add Patient</Link>
//       </div>
//       <form onSubmit={handleSearch} style={{ display: "flex" }}>
//         <input type="text" placeholder="Search patients" />
//         <button type="submit">Search</button>
//       </form>
//       {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
//     </nav>
//   );
// }

// export default Navbar;
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientInfo } from "../../context/PatientContext"; // Adjusted import for usePatientInfo hook
import { Link } from "react-router-dom"; // Ensure Link is imported
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const { createEmptyPatient } = usePatientInfo(); // Use the context function through the custom hook
  const navigate = useNavigate(); // Hook for navigation

  const handleAddPatient = async () => {
    try {
      const newPatientId = await createEmptyPatient(); // Call the function to create a patient
      navigate(`/add-patient/${newPatientId}`); // Navigate to the patient form with the new patient ID
    } catch (error) {
      console.error("Failed to create a new patient", error);
      alert("Failed to add new patient.");
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "10px" }}>
          Patient List
        </Link>
        <button onClick={handleAddPatient}>Add Patient</button>
      </div>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
