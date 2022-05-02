import axios from 'axios'

// axios instance initialization
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 20000
})

export default instance