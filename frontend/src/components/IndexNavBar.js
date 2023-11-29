import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/App.css";

const IndexNavBar = () => {
  const location = useLocation();

  let initialActiveLink = "Login";
  if (location.pathname === "/create-user") {
    initialActiveLink = "Create User";
  } else if (location.pathname === "/userguide") {
    initialActiveLink = "User Guide";
  }

  const [activeLink, setActiveLink] = useState(initialActiveLink);

  const handleLinkClick = (link, event) => {
    // Open link in a new tab if it's the "Tutorial" link
    if (link === "User Guide") {
      event.preventDefault();
      window.open("https://docs.google.com/document/d/1GDG985bTcjLlKcvI-6qtf1ZAPaq5pyeqyiGlA4xJwBQ/edit?usp=sharing", "_blank");
    } else {
      // Update state for other links
      setActiveLink(link);
      // Store the active link in local storage
      localStorage.setItem("activeLink", link);
    }
  };

  const linkStyle = {
    color: "white",
    fontSize: 32,
    fontStyle: "bold",
    padding: 30,
  };

  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Login" ? "active" : ""}`}
            color={"white"}
            aria-current="page"
            href="/"
            style={linkStyle}
            onClick={(event) => handleLinkClick("Login", event)}
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeLink === "Create User" ? "active" : ""
            }`}
            href="/create-user"
            style={linkStyle}
            onClick={(event) => handleLinkClick("Create User", event)}
          >
            Create User
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeLink === "User Guide" ? "active" : ""
            }`}
            href="/userguide"
            style={linkStyle}
            onClick={(event) => handleLinkClick("User Guide", event)}
          >
            User Guide
          </a>
        </li>
      </ul>
    </div>
  );
};

export default IndexNavBar;
