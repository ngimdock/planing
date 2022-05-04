import { createContext } from 'react'

const LevelContext = createContext({
  levels: [],
  getLevel: (id) => {},
  addLevels: (data) => {},
  addLevel: (data) => {},
  removeLevel: (id) => {},
  updateLevele: (id, data) => {}
})

export default LevelContext