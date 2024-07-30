// import React, { createContext, useState } from "react";
// import { login, logout } from "../services/auth.service";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = async (userData) => {
//     try {
//       await login(userData);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// import React, { createContext, useState, useEffect } from "react";
// import { login, logout, checkLoginStatus } from "../services/auth.service";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const response = await checkLoginStatus();
//         setIsLoggedIn(response.isLoggedIn);
//       } catch (error) {
//         console.error("Check login status error:", error);
//       }
//     };

//     checkLogin();
//   }, []);

//   const handleLogin = async (userData) => {
//     try {
//       await login(userData);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error("Login error:", error);
//       // Handle the error appropriately, e.g., show an error message to the user
//       alert("Invalid credentials. Please try again.");
//       setIsLoggedIn(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect } from "react";
import { login, logout, checkLoginStatus } from "../services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await checkLoginStatus();
        setIsLoggedIn(response.isLoggedIn);
      } catch (error) {
        console.error("Check login status error:", error);
      }
    };

    checkLogin();
  }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);
      if (response) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
      setIsLoggedIn(false);
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
