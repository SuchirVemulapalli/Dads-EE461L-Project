import React, { useState } from "react";
import "./Row.css";
import Item from "./Item";
const Row = ({data}) => {
  const [users, setUsers] = useState([
    ["list", " of", " authorized", " users"],
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

  const prop = {
    value: 50
  };

  return (
    <div>
      <div className="row-container">
        <h2 className="rowElement">{data.name}</h2>
        <h4 className="rowElement">{formatted}</h4>
        <div className="rowElement">
          <Item data = {prop}></Item>
          <Item data = {prop}></Item>
        </div>
        <button className="rowElement" onClick = {changeJoin} id= "joinButton">{buttonValue}</button>
      </div>
    </div>
  );
};

export default Row;
