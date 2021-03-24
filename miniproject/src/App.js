import React, { useState, useEffect } from 'react'
import Footer from './components/Footer'
import guideService from './services/guides'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState({name:"", id:null})
  const [loginError, setLoginError] = useState("")


  // Login functionality
  const Login = (details) => {
    guideService
      .find(details.id)
      .then(response => {
        console.log(response)
        setUser({
          name: response.data.name,
          id: response.data.id
        })
      })
      .catch(error => {
        setLoginError("Wrong secret id")
      })
  }

  const Logout = () => {
    setUser({name:"", id: null})
  }

  return (
    <div>
      {(user.name !== "") ? // Logged in page
        <div>
          <h1>Welcome {user.name}</h1>
          <button onClick={() => Logout()}>
            Logout
          </button>
        </div> : //Logged out page
        <div> 
          <h1>FinTour Webapp</h1>
          <p>Enter tourguide id to log in</p>
          {(loginError !== "") ? <h2>{loginError}</h2> : ""}
          <LoginForm Login={Login} error={loginError}/>
        </div>
        }
      
      <Footer />
    </div>
  )
}

export default App 