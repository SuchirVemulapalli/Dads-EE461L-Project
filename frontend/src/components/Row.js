import React, { useState } from "react";
import "../css/Row.css";
import Item from "./Item";
const Row = ({props}) => {
  const { projectid, projectMap, userMap } = props;
  const [users, setUsers] = useState([
    userMap[projectid]
  ]);
  const [formatted, setFormatted] = useState(users.join(" , "));
  const [buttonText, setButtonText] = useState({color: "blue"})
  const [buttonValue, setButtonValue] = useState('Join')

  const changeJoin= () =>{
    if (buttonValue === 'Join'){
        setButtonValue('Remove')
    }
    else{
        setButtonValue('Join')
    }
  }


  return (
    <div>
      <div className="row-container">
        <h2 className="rowElement">{props.projectid}</h2>
        <h4 className="rowElement">{formatted}</h4>
        <div className="rowElement">
          <Item prop = {projectMap[projectid][0]}></Item>
          <Item prop = {projectMap[projectid][1]}></Item>
        </div>
        <button className="rowElement" onClick = {changeJoin} id= "joinButton">{buttonValue}</button>
      </div>
    </div>
  );
};

export default Row;
