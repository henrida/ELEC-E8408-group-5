import axios from 'axios'
// const baseUrl = 'http://127.0.0.1:3001/tours'
const baseUrl = 'http://192.168.1.2:3001/tours'

const findTour = (id) => {
  const request = axios.get(`${baseUrl}`)
  const tours = request.then(response => response.data)
  console.log(tours)
  return tours
}

const setTour = (newTours, idx) => {
  const request = axios.put(`${baseUrl}/${idx+1}`, newTours[idx])
  const tours = request.then(response => response.data)
  console.log(tours)
  return tours
}

export default { 
  findTour: findTour,
  setTour: setTour
}