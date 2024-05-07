import "./LoginPage.css";

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin({ username, password });
      navigate("/"); // Use navigate to redirect
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (e.g., show a message to the user)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
