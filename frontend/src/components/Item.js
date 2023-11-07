import React, { useState } from 'react';
import '../css/Item.css';

const Item = ({ itemName, prop }) => {
  const [buttonText, setButtonText] = useState({ color: "blue" });
  const [buttonValue, setButtonValue] = useState('join');

  const [qty, setQty] = useState(prop.quantity)
  const [projectID, setProjectID] = useState(prop.projectID)
  
  return (
    <div>
      <div className='itemRow'>
        <h3 className='itemElement'>{itemName}: {qty}/100</h3>
        <input type= "number" className='itemElement' placeholder="Enter qty" />
        <button className='itemElement'>Check In</button>
        <button className='itemElement'>Check Out</button>
      </div>
    </div>
  );
}

export default Item;