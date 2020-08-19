import axios from 'axios'

export default axios.create({
  baseURL: 'https://healthcare-node-api.herokuapp.com/api'
})
