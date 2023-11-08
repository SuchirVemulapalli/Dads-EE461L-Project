import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../css/App.css";

const LandingNavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("Projects");

  const logout = () => {
    localStorage.setItem('username', '');
  }
  
  useEffect(() => {
    if (location.pathname === "/create-project") {
      setActiveLink("Create Project");
    } else if (location.pathname === "/join-project") {
      setActiveLink("Join Project");
    } else if (location.pathname === "/leave-project") {
      setActiveLink("Leave Project");
    } else {
      setActiveLink("Projects"); // Default to "Projects" for other routes
    }
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("landingActiveLink", link);
  };

  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === "Projects" ? "active" : ""}`}
            to="/landing"
            onClick={() => handleLinkClick("Projects")}
          >
            Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === "Create Project" ? "active" : ""}`}
            to="/create-project"
            onClick={() => handleLinkClick("Create Project")}
          >
            Create Project
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === "Join Project" ? "active" : ""}`}
            to="/join-project"
            onClick={() => handleLinkClick("Join Project")}
          >
            Join Project
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === "Leave Project" ? "active" : ""}`}
            to="/leave-project"
            onClick={() => handleLinkClick("Leave Project")}
          >
            Leave Project
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LandingNavBar;