import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import "../App.css";

const LandingNavBar = () => {
  const location = useLocation(); // Get the current location from react-router-dom
  const [activeLink, setActiveLink] = useState("Projects");

  const logout = () => {
    localStorage.setItem('username', '');
  }
  
  useEffect(() => {
    // Determine the initial active link based on the current route
    if (location.pathname === "/create-project") {
      setActiveLink("Create Project");
    } else if (location.pathname === "/join-project") {
      setActiveLink("Join Project");
    }
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    // Store the active link in local storage
    localStorage.setItem("landingActiveLink", link);
  };

  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}
            aria-current="page"
            href="/landing"
            onClick={() => handleLinkClick("Projects")}
          >
            Projects
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Create Project" ? "active" : ""}`}
            href="/create-project"
            onClick={() => handleLinkClick("Create Project")}
          >
            Create Project
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "Join Project" ? "active" : ""}`}
            href="/join-project"
            onClick={() => handleLinkClick("Join Project")}
          >
            Join Project
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LandingNavBar;