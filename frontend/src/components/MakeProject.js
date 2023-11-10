import React, { useState } from 'react'
import axios from 'axios'
const MakeProject = ({prop}) => {
    const [projectID, setProjectID] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] =useState('')
    const createProject = () => {
        axios
      .post(
        "http://127.0.0.1:5000/create-project",
        {
          projectID: projectID,
          description: description,
          user: localStorage.getItem('username')
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
        setStatus(data.status)
      })
      .catch((error) => {
        // Handle errors, e.g., network errors or API errors
        console.error("There was a problem with the fetch operation:", error);
      });
    }

  return (
    <div>
        <input
        type="text"
        placeholder="Project ID"
        onChange={(e) => setProjectID(e.target.value)}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>   
      <h6>{status}</h6>   
      <br></br>
      <button type="button" className="btn btn-primary" onClick={createProject}> 
        Create
      </button>
    </div>
  )
}

export default MakeProject