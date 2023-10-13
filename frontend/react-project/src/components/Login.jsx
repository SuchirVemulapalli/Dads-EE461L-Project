import React, { useState } from "react";

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
    <div>
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
      <button type="button" className="btn btn-primary" onClick={verify}>
        Login
      </button>
    </div>
  );
};

export default Login;
