import React, { useState} from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import "../css/App.css";

const IndexNavBar = () => {
  const location = useLocation(); // Get the current location from react-router-dom

  // Determine the initial active link based on the current route
  let initialActiveLink = "Login";
  if (location.pathname === "/create-user") {
    initialActiveLink = "Create User";
  } else if (location.pathname === "/tutorial") {
    initialActiveLink = "Tutorial";
  }

  const [activeLink, setActiveLink] = useState(initialActiveLink);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    // Store the active link in local storage
    localStorage.setItem("activeLink", link);
  };

  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Login" ? "active" : ""}`}
            aria-current="page"
            href="/"
            onClick={() => handleLinkClick("Login")}
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Create User" ? "active" : ""}`}
            href="/create-user"
            onClick={() => handleLinkClick("Create User")}
          >
            Create User
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Tutorial" ? "active" : ""}`}
            href="/tutorial"
            onClick={() => handleLinkClick("Tutorial")}
          >
            Tutorial
          </a>
        </li>
      </ul>
    </div>
  );
};

export default IndexNavBar;