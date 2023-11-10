import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppContext } from './AppContext';

const Inventory = () => {
  const { quantity1, capacity1, quantity2, capacity2 } = useAppContext();

  useEffect(() => {
    // Effect to run when trigger changes
    console.log('Inventory has re-rendered');
  }, [quantity1, capacity1, quantity2, capacity2]);

  return (
    <div>
        <h1>Inventory (Available Quantity/Total Capacity)</h1>
        <h2>HWSet1: {quantity1}/{capacity1}</h2>
        <h2>HWSet2: {quantity2}/{capacity2}</h2>


    </div>
  )
}

export default Inventory