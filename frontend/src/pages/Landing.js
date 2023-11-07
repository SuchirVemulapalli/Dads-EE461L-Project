import React from 'react'
import DataTable from "../components/DataTable"
import LandingNavBar from '../components/LandingNavBar'
import Inventory from '../components/Inventory'
const Landing = () => {
  return (
    <div>
      <div className="login-align">
      <LandingNavBar></LandingNavBar>
      </div>
    <Inventory></Inventory>
    <DataTable></DataTable>
    </div>
  )
}

export default Landing