import React, { useState } from "react";

const backendURL = 'http://localhost:5000'; // or your server's actual address
const CreateUser = () => {
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [inputConfirm, setInputConfirm] = useState("");
  
  // const testAPI = () => {
  //   fetch('http://localhost:5000/api/test',{
  //     method: 'GET',
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Set the response message in state
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });    
  // }
  const addUser = () => {
    fetch('http://localhost:5000/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Use 'application/json' content type
      },
      body: JSON.stringify({
        user: inputUser,
        pass: inputPass,
        confirm: inputConfirm,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        const status = data.status;
        if (status === 'success') {
          console.log('success');
        } else {
          console.log('failure');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        name="username"
        id="username"
        value={inputUser}
        onChange={(e) => setInputUser(e.target.value)}
      ></input>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value = {inputPass}
        onChange={(e) => setInputPass(e.target.value)}
      ></input>
      <br></br>
      <input
        type="password"
        placeholder="Confirm Password"
        name="password"
        id="password"
        value = {inputConfirm}
        onChange = {(e) => setInputConfirm(e.target.value)}
      ></input>
      <br></br>
      <button type="button" className="btn btn-primary" onClick= {addUser}> 
        Create
      </button>
    </div>
  );
};

export default CreateUser;
