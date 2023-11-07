import React, { useState } from 'react';
import '../css/Item.css';
import axios from 'axios'
const Item = ({ itemName, prop }) => {
  const [buttonText, setButtonText] = useState({ color: "blue" });
  const [buttonValue, setButtonValue] = useState('join');

  const [qty, setQty] = useState(prop.quantity)
  const [projectID, setProjectID] = useState(prop.projectID)

  const [input, setInput] = useState(null)
  
  //for error msg
  const [showText, setShowText] = useState(false)
  const [status, setStatus] = useState("")

  const checkOut = () =>{
    if (!qty){
      let text = "error";
      setShowText(true)
      setStatus(text)
    }
    else{
      axios
        .post(
          "http://127.0.0.1:5000/checkOut",
          {
            projectid: projectID,
            set: itemName,
            input: input,
            quantity: qty,
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
          if (data.status === "failure"){
            let text = "error";
            setShowText(true)
            setStatus(text)
          }
          else{
            let projectid = data.projectid;
            let output = data.output;
            let text = output + " hardware checked out";
            setShowText(true)
            setStatus(text)
            setQty(output)

          }
        })
        .catch((error) => {
          // Handle errors, e.g., network errors or API errors
          console.error("There was a problem with the fetch operation:", error);
        });
      }
  }
  
  return (
    <div>
      <div className='itemRow'>
        <h3 className='itemElement'>{itemName}: {qty}/100</h3>
        <input type= "number" className='itemElement' placeholder="Enter qty" onChange={(e) => setInput(e.target.value)}/>
        <button className='itemElement'>Check In</button>
        <button className='itemElement' onClick={checkOut}>Check Out</button>
      </div>
      {showText && (
        <div>
          <input readOnly type="text" value={status}/>
        </div>
        )}
    </div>
  );
}

export default Item;