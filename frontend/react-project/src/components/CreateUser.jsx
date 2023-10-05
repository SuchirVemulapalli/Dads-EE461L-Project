import React from 'react'

const CreateUser = () => {
  return (
    <div>
          <input type="text" placeholder = "Username" name="username" id="username"></input>
          <br></br>
          <input type="text" placeholder = "Password" name="password" id="password"></input>
          <br></br>
          <input type="text" placeholder = "Confirm Password" name="password" id="password"></input>
          <br></br>
          <button type="button" class="btn btn-primary">Create</button>
      </div>
  )
}

export default CreateUser