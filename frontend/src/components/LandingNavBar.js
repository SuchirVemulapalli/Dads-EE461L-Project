import React from "react";
import "../App.css"
import axios from 'axios'
const LandingNavBar = () => {
  const logout = () => {
    localStorage.setItem('username', '');
  }
  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/landing">
            Projects
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/create-project">
            Create Project
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/join-project">
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
