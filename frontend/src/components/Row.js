import React, { useState } from "react";
import "../css/Row.css";
import Item from "./Item";
import { Button } from "@mui/material";
import {Grid} from "@mui/material";
import axios from 'axios'

const Row = ({ props }) => {
  const { projectid, projectMap, userMap, onButtonClick, onButtonClick2 } = props;
  const [users, setUsers] = useState([userMap[projectid]]);
  const [formatted, setFormatted] = useState(users.join(" , "));
  const [buttonText, setButtonText] = useState({ color: "blue" });
  const [description, setDescription] = useState(projectMap[projectid][2]);
  
  const leaveProject = () => {
    onButtonClick(projectid)
  }
  //prop for HWSet1
  let prop1 = {
    projectID: projectid,
    quantity: projectMap[projectid][0],
    refreshStats: onButtonClick2
  }
  //prop for HWSet2
  let prop2 = {
    projectID: projectid,
    quantity: projectMap[projectid][1],
    refreshStats: onButtonClick2
  }
  return (
      <Grid container spacing={1} style={{ border: '2px solid #000', margin:'10px', maxWidth:'97%'}}>
        <Grid item xs={1} container alignItems="center">
          <h2 className="rowElement">{props.projectid}</h2>
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <h2 className="rowElement">{description}</h2>
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <h4 className="rowElement">{formatted}</h4>
        </Grid>
        <Grid item xs={9} container alignItems="center">
          <div className="rowElement">
            <Item itemName="HWSet1" prop={prop1} />
            <Item itemName="HWSet2" prop={prop2} />
          </div>
          <Button variant='outlined' color="error" onClick={leaveProject} style={{ marginLeft:'80px'}}>Leave</Button>
        </Grid>
      </Grid>
  );
}

export default Row;
