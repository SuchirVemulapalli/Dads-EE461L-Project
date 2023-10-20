import React, { useState } from "react";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Login.css';

const Login = () => {
  const [inputPass, setInputPass] = useState("");
  const [inputUser, setInputUser] = useState("");

  const verify = () => {
    fetch("/api/login", {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        user: inputUser,
        pass: inputPass,
      }),
    })
      .then(res=> res.json())
      .then(data =>{
        const status = data.status
        if(status == "success"){
  
        }
        else{
          
        }
      })
      .catch(error =>{
        console.log("Error", error)
      })
  };

  return (
    <div className="login">
      <input
        type="text"
        placeholder="Username"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
        name="username"
        id="username"
      ></input>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        value={inputPass}
        onChange={(e) => setInputPass(e.target.value)}
        name="password"
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
