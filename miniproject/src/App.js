import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Footer from './components/Footer'
import guideService from './services/guides'
import tourService from './services/tours'
import LoginForm from './components/LoginForm'
import RenderTour from './components/RenderTour'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState({ name: "", id: null })
  const [loginError, setLoginError] = useState("")
  const [tourIdx, setTourIdx] = useState(0)
  const [tours, setTours] = useState({ id: 0, guide: 0, origin: "plchldr", destination: "plchldr", current_port: "plchldr", next_port: "plchldr", departure_time: "plchldr", status: "plchldr" })
  const [ports, setPorts] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://192.168.1.2:3001/ports')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setPorts(response.data)
      })
  }, [])

  const CalcNewTime = () => {
    let new_depart_time = new Date()
    new_depart_time = moment(new_depart_time).add(2, 'hours')
    console.log(new_depart_time.toLocaleString())
    return new_depart_time
  }

  const setNewTours = (newTours) => {
    tourService.setTour(newTours, tourIdx).then(response => {
      let new_tours = [...tours]
      new_tours[tourIdx] = response
      setTours(new_tours)
    })
  }

  const setOrigin = (newOrigin) => {
    let new_tour = tours[tourIdx]
    new_tour.origin = newOrigin.value
    new_tour.current_port = newOrigin.value
    let new_tours = tours
    new_tours[tourIdx] = new_tour
    setNewTours(new_tours)
  }

  const setDestination = (newDestination) => {
    let new_tour = tours[tourIdx]
    new_tour.destination = newDestination.value
    let new_tours = tours
    new_tours[tourIdx] = new_tour
    setNewTours(new_tours)
  }

  const RestartTour = (tour) => {
    let new_tour = tour
    new_tour.status = "at port"
    new_tour.origin = "not selected"
    new_tour.destination = "not selected"
    new_tour.current_port = "not selected"
    new_tour.next_port = "not selected"
    let new_tours = tours
    new_tours[tourIdx] = new_tour
    setNewTours(new_tours)
  }

  const HandlePortSelect = (newPort) => {
    let new_tour = tours[tourIdx]
    new_tour.next_port = newPort.value
    let new_tours = tours
    new_tours[tourIdx] = new_tour
    setNewTours(new_tours)
  }
  const HandleArrival = (tour) => {
    const new_depart_time = CalcNewTime()
    let new_tour = tour
    new_tour.departure_time = new_depart_time
    new_tour.status = "at port"
    if (typeof(new_tour.next_port) !== 'undefined' && new_tour.next_port !== "not selected") {
      new_tour.current_port = new_tour.next_port
    }
    let new_tours = tours
    new_tours[tourIdx] = new_tour
    setNewTours(new_tours)
  }

  const HandleDepart = (tour) => {
    if (tour.next_port === "not selected" || (tour.next_port == tour.current_port)) {
      alert("Choose next port before departing")
      return
    }
    let new_tour = tour
    new_tour.status = "on the move"
    let new_tours = tours
    new_tours[tourIdx] = new_tour
    setNewTours(new_tours)
  }

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
    tourService.findTour(details.id).then(response => {
      const testTour = response.filter(tour => tour.guide === parseInt(details.id, 10))
      const thisTourIdx = response.findIndex(tour => tour.guide === parseInt(details.id, 10))
      setTourIdx(thisTourIdx)
      setTours(response)
    })
  }

  const Logout = () => {
    setUser({ name: "", id: null })
  }

  return (
    <div>
      {(user.name !== "") ?
        <div>
          <h1>Welcome {user.name}</h1>
          <button onClick={() => Logout()}>
            Logout
          </button>
          <RenderTour tour={tours[tourIdx]} handleDepart={HandleDepart} handleArrival={HandleArrival} handlePortSelect={HandlePortSelect} ports={ports} restartTour={RestartTour} setDestination={setDestination} setOrigin={setOrigin}/>
        </div> :
        <div>
          <h1>FinTour webapp</h1>
          <p>Enter tourguide id to log in:</p>
          {(loginError !== "") ? <h2>{loginError}</h2> : ""}
          <LoginForm Login={Login} error={loginError} />
        </div>
      }

      <Footer />
    </div>
  )
}

export default App