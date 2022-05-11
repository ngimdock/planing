import { createContext } from 'react'

const PlanningContext = createContext({
  programs: [],
  currentSemester: null,
  currentClass: null,
  loaded: false,
  selectSemester: (value) => {},
  selectClass: (value) => {},
  setLoaded: () => {},
  dispatch: (action) => {}
})

export default PlanningContext