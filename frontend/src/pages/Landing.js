import React from 'react'
import DataTable from "../components/DataTable"
import LandingNavBar from '../components/LandingNavBar'
import Inventory from '../components/Inventory'
import { AppProvider } from '../components/AppContext';

const Landing = () => {
  return (
    <div>
      <div className="login-align">
      <LandingNavBar></LandingNavBar>
      </div>
    <AppProvider>
      <Inventory></Inventory>
      <DataTable></DataTable>
    </AppProvider>
    </div>
  )
}

export default Landing