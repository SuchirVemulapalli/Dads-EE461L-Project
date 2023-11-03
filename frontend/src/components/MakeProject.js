import React, { useState } from 'react'
import axios from 'axios'
const MakeProject = ({prop}) => {
    const [projectID, setProjectID] = useState('')
    const [HWSet1, setHWSet1] = useState('')
    const [HWSet2, setHWSet2] = useState('')

    const createProject = () => {
        axios
      .post(
        "http://127.0.0.1:5000/create-project",
        {
          projectID: projectID,
          HWSet1: HWSet1,
          HWSet2: HWSet2,
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
        type="number"
        placeholder="HWSet1 Qty"
        onChange={(e) => setHWSet1(e.target.value)}
      ></input>
      <br></br>
      <input
        type="number"
        placeholder="HWSet2 Qty"
        onChange={(e) => setHWSet2(e.target.value)}
      ></input>
      <br></br>
      <button type="button" className="btn btn-primary" onClick={createProject}> 
        Create
      </button>
    </div>
  )
}

export default MakeProject