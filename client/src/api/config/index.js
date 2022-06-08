import axios from 'axios'

// axios instance initialization
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 20000
})

// axios instance initialization
// const instance = axios.create({
//   baseURL: 'http://192.168.43.40:5000',
//   timeout: 20000
// })

export default instance