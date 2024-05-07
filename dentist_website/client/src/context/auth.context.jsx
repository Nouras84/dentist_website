// // context/auth.context.jsx
// import React, { createContext, useState } from "react";
// import { login, logout } from "../services/auth.service";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = async (userData) => {
//     try {
//       const user = await login(userData);
//       setIsLoggedIn(true);
//       // More logic after successful login
//     } catch (error) {
//       console.error("Login error:", error);
//       // Handle login error
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//     setIsLoggedIn(false);
//     // More logic after logout
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useState } from "react";
import { login, logout } from "../services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (userData) => {
    try {
      await login(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
