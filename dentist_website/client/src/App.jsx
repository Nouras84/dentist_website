// work perfectly before styling
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./context/auth.context";
// import { PatientProvider } from "./context/PatientContext";
// import Navbar from "./components/Navbar/Navbar";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import PatientFormPage from "./pages/PatientForm";
// import PatientList from "./pages/PatientList/PatientList";
// import PatientProfile from "./pages/PatientProfile";

// function App() {
//   return (
//     <AuthProvider>
//       <PatientProvider>
//         <Router>
//           <AuthContext.Consumer>
//             {({ isLoggedIn }) => (
//               <>
//                 {isLoggedIn && <Navbar />}
//                 <Routes>
//                   <Route path="/login" element={<LoginPage />} />
//                   {isLoggedIn ? (
//                     <>
//                       <Route path="/" element={<PatientList />} />
//                       <Route
//                         path="/add-patient/:patientId"
//                         element={<PatientFormPage />}
//                       />
//                       <Route
//                         path="/add-patient"
//                         element={<PatientFormPage />}
//                       />
//                       <Route
//                         path="/patient-profile/:id"
//                         element={<PatientProfile />}
//                       />
//                     </>
//                   ) : (
//                     <Route path="*" element={<Navigate to="/login" />} />
//                   )}
//                 </Routes>
//               </>
//             )}
//           </AuthContext.Consumer>
//         </Router>
//       </PatientProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/auth.context";
import { PatientProvider } from "./context/PatientContext";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import PatientFormPage from "./pages/PatientForm";
import PatientList from "./pages/PatientList/PatientList";
import PatientProfile from "./pages/PatientProfile";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <Router>
          <AuthContext.Consumer>
            {({ isLoggedIn }) => (
              <>
                {isLoggedIn && <Navbar />}
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  {isLoggedIn ? (
                    <>
                      <Route path="/" element={<PatientList />} />
                      <Route
                        path="/add-patient/:patientId"
                        element={<PatientFormPage />}
                      />
                      <Route
                        path="/add-patient"
                        element={<PatientFormPage />}
                      />
                      <Route
                        path="/patient-profile/:id"
                        element={<PatientProfile />}
                      />
                    </>
                  ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                  )}
                </Routes>
              </>
            )}
          </AuthContext.Consumer>
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
