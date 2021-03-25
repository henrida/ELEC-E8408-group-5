import axios from 'axios'
const baseUrl = 'http://192.168.1.2:3001/guides'
// const baseUrl = 'http://127.0.0.1:3001/guides'


const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const find = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  find: find
}