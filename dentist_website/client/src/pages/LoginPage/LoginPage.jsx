// import "./LoginPage.css";

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/auth.context";
// import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { handleLogin, isLoggedIn } = useContext(AuthContext);
//   const navigate = useNavigate(); // useNavigate instead of useHistory

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await handleLogin({ username, password });
//       if (isLoggedIn) {
//         navigate("/"); // Use navigate to redirect
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Handle login errors (e.g., show a message to the user)
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin({ username, password });
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (e.g., show a message to the user)
    }
  };

  // Use useEffect to navigate when isLoggedIn changes to true
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
