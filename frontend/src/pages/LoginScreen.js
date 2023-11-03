import React from 'react'
import IndexNavBar from "../components/IndexNavBar";
import Login from "../components/Login";
import "../App.css"

const LoginScreen = () => {
  return (
    <div className='login-align'>
        <IndexNavBar></IndexNavBar>
        <Login></Login>
    </div>

    )
}

export default LoginScreen