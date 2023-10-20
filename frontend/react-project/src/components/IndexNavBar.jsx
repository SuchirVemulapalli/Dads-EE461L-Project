import React from "react";
import "../App.css"
const IndexNavBar = () => {
  return (
    <div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/create-user">
            Create User
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/tutorial">
            Tutorial
          </a>
        </li>
      </ul>
    </div>
  );
};

export default IndexNavBar;
