// // src/index.jsx
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { AuthProvider } from "./context/auth.context"; // Corrected import

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       {" "}
//       {/* Updated to use AuthProvider */}
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth.context"; // Corrected import

const container = document.getElementById("root"); // Get the container element
const root = createRoot(container); // Create a root instance on the container

root.render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* Updated to use AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
