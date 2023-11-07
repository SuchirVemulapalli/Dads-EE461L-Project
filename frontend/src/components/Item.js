import React, { useState } from 'react';
import '../css/Item.css';

const Item = ({ itemName, prop }) => {
  const [buttonText, setButtonText] = useState({ color: "blue" });
  const [buttonValue, setButtonValue] = useState('join');

  return (
    <div>
      <div className='itemRow'>
        <h3 className='itemElement'>{itemName}: {prop}/100</h3>
        <input className='itemElement' placeholder="Enter qty" />
        <button className='itemElement'>Check In</button>
        <button className='itemElement'>Check Out</button>
      </div>
    </div>
  );
}

export default Item;