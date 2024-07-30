// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { usePatientInfo } from "../../context/PatientContext"; // Adjusted import for usePatientInfo hook
// import { Link } from "react-router-dom"; // Ensure Link is imported
// import { AuthContext } from "../../context/auth.context";
// import "./Navbar.css";

// function Navbar() {
//   const { isLoggedIn, handleLogout } = useContext(AuthContext);
//   const {
//     createEmptyPatient,
//     clearPatientInfo,
//     setAfterClickingTheAddPatientButton,
//   } = usePatientInfo(); // Use the context function through the custom hook
//   const navigate = useNavigate(); // Hook for navigation
//   const location = useLocation();
//   const path = location.pathname;

//   const handleAddPatient = async () => {
//     try {
//       setAfterClickingTheAddPatientButton(true);
//       clearPatientInfo();
//       const newPatientId = await createEmptyPatient(); // Call the function to create a patient
//       navigate(`/add-patient/${newPatientId}`); // Navigate to the patient form with the new patient ID
//     } catch (error) {
//       console.error("Failed to create a new patient", error);
//       alert("Failed to add new patient.");
//     }
//   };

//   const handleLogoutClick = async () => {
//     await handleLogout();
//     navigate("/login"); // Redirect to login page after logout
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
//         <Link
//           onClick={() => {
//             setAfterClickingTheAddPatientButton(false);
//           }}
//           to="/"
//           style={{ marginRight: "10px" }}
//         >
//           Patient List
//         </Link>
//         <button
//           style={{
//             opacity: path === "/" ? "1" : "0.5",
//             pointerEvents: path !== "/" && "none",
//           }}
//           onClick={handleAddPatient}
//         >
//           Add Patient
//         </button>
//       </div>
//       {isLoggedIn && <button onClick={handleLogoutClick}>Logout</button>}
//     </nav>
//   );
// }

// export default Navbar;

import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePatientInfo } from "../../context/PatientContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const {
    createEmptyPatient,
    clearPatientInfo,
    setAfterClickingTheAddPatientButton,
  } = usePatientInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const handleAddPatient = async () => {
    try {
      setAfterClickingTheAddPatientButton(true);
      clearPatientInfo();
      const newPatientId = await createEmptyPatient();
      navigate(`/add-patient/${newPatientId}`);
    } catch (error) {
      console.error("Failed to create a new patient", error);
      alert("Failed to add new patient.");
    }
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  // If the user is not logged in, do not render the Navbar
  if (!isLoggedIn) {
    return null;
  }

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
        <Link
          onClick={() => {
            setAfterClickingTheAddPatientButton(false);
          }}
          to="/"
          style={{ marginRight: "10px" }}
        >
          Patient List
        </Link>
        <button
          style={{
            opacity: path === "/" ? "1" : "0.5",
            pointerEvents: path !== "/" && "none",
          }}
          onClick={handleAddPatient}
        >
          Add Patient
        </button>
      </div>
      <button onClick={handleLogoutClick}>Logout</button>
    </nav>
  );
}

export default Navbar;
