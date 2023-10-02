import React from "react";
import IndexNavBar from "../components/IndexNavBar";
import App from "../App";
import CreateUser from "../components/CreateUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
  // import {Link} from "react-router-dom"

const Create = () => {
  return (
    <div> 
    <IndexNavBar></IndexNavBar>
    
    <CreateUser></CreateUser>
    </div>
  );
};

export default Create;
