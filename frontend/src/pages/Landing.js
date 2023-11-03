import React from 'react'
import DataTable from "../components/DataTable"
import LandingNavBar from '../components/LandingNavBar'
const Landing = () => {
  return (
    <div>
      <div className="login-align">
      <LandingNavBar></LandingNavBar>
      </div>
    <DataTable></DataTable>
    </div>
  )
}

export default Landing