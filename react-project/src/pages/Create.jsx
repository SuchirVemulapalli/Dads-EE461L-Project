import React from "react";
import IndexNavBar from "../components/IndexNavBar";
import Login from "../components/Login";
import App from "../App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
  // import {Link} from "react-router-dom"

const Create = () => {
  return (
    <div> 
    <IndexNavBar></IndexNavBar>
    
    <Login></Login>
    </div>
  );
};

export default Create;
