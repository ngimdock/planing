import { createContext } from 'react'

const PlanningContext = createContext({
  programs: [],
  currentSemester: null,
  currentClass: null,
  loaded: false,
  selectSemester: (value) => {},
  selectClass: (value) => {},
  getClass: (payload) => {},
  setLoaded: () => {},
  dispatch: (action) => {}
})

export default PlanningContext