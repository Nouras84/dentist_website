import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search functionality to be implemented");
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
        <Link to="/add-patient">Add Patient</Link>
      </div>
      <form onSubmit={handleSearch} style={{ display: "flex" }}>
        <input type="text" placeholder="Search patients" />
        <button type="submit">Search</button>
      </form>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
