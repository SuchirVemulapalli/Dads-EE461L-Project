import React, { useState } from "react";
<<<<<<< HEAD
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Login.css';
=======
import axios from "axios";
>>>>>>> 61d5b61e5571e83555db0ad51d67643937a753c0

const Login = () => {
  const [inputPass, setInputPass] = useState("");
  const [inputUser, setInputUser] = useState("");

  const verify = () => {
    axios
      .post(
        "http://127.0.0.1:5000/login",
        {
          user: inputUser,
          pass: inputPass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data; // Axios automatically parses the response data as JSON
      })
      .then((data) => {
        // Work with the JSON data here
        console.log(data);
      })
      .catch((error) => {
        // Handle errors, e.g., network errors or API errors
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="login">
      <input
        type="text"
        placeholder="Username"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
        id="username"
      ></input>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        value={inputPass}
        onChange={(e) => setInputPass(e.target.value)}
        id="password"
      ></input>
      <br></br>
      <Button variant="contained" onClick={verify}>
        Login
      </Button>
    </div>
  );
};

export default Login;
