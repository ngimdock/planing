import { createContext } from 'react'

const LevelContext = createContext({
  levels: [],
  selectedLevel:{},
  getLevel: (id) => {},
  setLevel: (id, name) =>{},
  addLevels: (data) => {},
  addLevel: (data) => {},
  removeLevel: (id) => {},
  updateLevel: (id, data) => {}
})

export default LevelContext