import React from "react";

const IndexNavBar = () => {
  return (
    <div>
      <ul class="nav nav-underline">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            Login
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Create User
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Tutorial
          </a>
        </li>
      </ul>
    </div>
  );
};

export default IndexNavBar;
