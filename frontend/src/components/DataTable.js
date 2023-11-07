import React, { useState, useEffect } from "react";
import Row from "./Row";
import "../css/Project.css";
import axios, { getAdapter } from 'axios'
const DataTable = () => {
    const [projects, setProjects] = useState([]);
    const [hardwareMap, setHardwareMap] = useState({})
    const [projectMap, setProjectMap] = useState({})
    const [userMap, setUserMap] = useState({})

    //boolean to show project rows or not
    const [showRows, setShowRows] = useState(false)

    const getData = () =>{
      axios
      .post(
        "http://127.0.0.1:5000/get-docs",
        {
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
          // "status" : status,
          // "hardwareMap" : hardwareMap,
          // "projectMap" : projectMap,
          // "userMap" : userMap,
          // "projectList" : validProjects #list of user's projects
          if(data.status === "none"){
            setShowRows(false)
          }
          else{
            setShowRows(true)
            setProjects(data.projectList)
            setHardwareMap(data.hardwareMap)
            setProjectMap(data.projectMap)
            setUserMap(data.userMap)
          }

        
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    useEffect(() => {
        getData()
    }, []);
    
    const props = {
        name: "Project"
    };
  return (
    <div>
      <div className="window">
        <h1>Projects</h1>
        {showRows && (
          <ul>
            {projects.map((id, index) => (
              //have to send project id to the Row component
              <Row
              props={{
                projectid: id,
                projectMap: projectMap,
                userMap: userMap,
              }}
            />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DataTable;
