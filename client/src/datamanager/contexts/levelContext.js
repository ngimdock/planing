import { createContext } from 'react'

const LevelContext = createContext({
  levels: [],
  selectedLevel:{},
  getLevel: (id) => {},
  setLevel: (data) =>{},
  addLevels: (data) => {},
  addLevel: (data) => {},
  removeLevel: (id) => {},
  updateLevel: (id, data) => {}
})

export default LevelContext