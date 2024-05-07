// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/auth.context";

// import Navbar from "./components/Navbar/Navbar";

// // Import other components/pages
// import LoginPage from "./pages/LoginPage/LoginPage";
// import PatientFormPage from "./pages/PatientForm";

// import PatientList from "./pages/PatientList/PatientList";
// // import PatientProfile from "./components/PatientProfile";
// // import PatientForm from "./components/PatientForm";
// // ...other imports as needed...

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           {/* Uncomment and update these routes as you create the components */}
//           <Route exact path="/" element={<PatientList />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/add-patient" element={<PatientFormPage />} />
//           {/* <Route path="/patients/:id" element={<PatientProfile />} /> */}
//           {/* <Route path="/add-patient" element={<PatientForm />} /> */}
//           {/* Add more routes as needed */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/auth.context";
// import { PatientProvider } from "./context/PatientContext"; // Ensure you've imported PatientContext if you're using it
// import Navbar from "./components/Navbar/Navbar";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import PatientFormPage from "./pages/PatientForm"; // Adjust if necessary
// import PatientList from "./pages/PatientList/PatientList"; // Correct import for PatientList

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<PatientList />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/add-patient"
//             element={
//               <PatientProvider>
//                 <PatientFormPage />
//               </PatientProvider>
//             }
//           />
//           {/* Add more routes as needed */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { PatientProvider } from "./context/PatientContext";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import PatientFormPage from "./pages/PatientForm";
import PatientList from "./pages/PatientList/PatientList";

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
            <Route path="/add-patient" element={<PatientFormPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
