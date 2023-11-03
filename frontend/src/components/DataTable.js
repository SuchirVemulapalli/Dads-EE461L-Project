import React, { useState, useEffect } from "react";
import Row from "./Row";
import "./Project.css";
import axios, { getAdapter } from 'axios'
const DataTable = () => {
    const [topics, setTopics] = useState([]);
    const [map, setMap] = useState({})
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
          console.log(data)
        // Work with the JSON data here
            // console.log("hello")
            // console.log(data);
            // if(data.status && data.status === "none"){
            //   //if there are no collections
            // }
            // else{
            //   setTopics(data.topics)
            //   setMap(data.map)
            // }
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
        <ul>
          {topics.map((item, index) => (
            <h1>{index}</h1>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTable;
