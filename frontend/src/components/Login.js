import React, { useState } from "react";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
//import './Login.css';
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../css/LoginScreen.css";


const Login = () => {
  const [inputPass, setInputPass] = useState("");
  const [inputUser, setInputUser] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function using useNavigate
  const [status, setStatus] = useState('');

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
        //if the login is successful send to landing page
        if(data.status === "success"){
          console.log("success");
          setStatus(data.status)
          localStorage.setItem('username', inputUser);
          navigate("/landing");
        }
        //tell user why the login failed
        else{
          setStatus(data.status);
        }
      })
      .catch((error) => {
        // Handle errors, e.g., network errors or API errors
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="login">
      <input
          style={{marginTop:'-100px', height: '50px', width:'200px'}}
        type="text"
        placeholder="Username"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
        id="username"
      ></input>
      <br></br>
      <input
          style={{marginBottom:'-50px', height: '50px', width:'200px'}}
        type="password"
        placeholder="Password"
        value={inputPass}
        onChange={(e) => setInputPass(e.target.value)}
        id="password"
      ></input>
      <br></br>
      <h6>{status}</h6>
      <br></br>
      <button type="button" className="btn btn-primary" style={{width:'200px', height: '50px'}} onClick={verify}>
        Login
      </button>      
    </div>
  );
};

export default Login;
