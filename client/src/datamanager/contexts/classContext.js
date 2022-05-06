import { createContext } from 'react'

const ClassContext = createContext({
  classes: [],
  getClass: (id) => {},
  addClasses: (data) => {},
  addClass: (data) => {},
  updateClass: (id, data) => {},
  removeClass: (id) => {}
})

export default ClassContext