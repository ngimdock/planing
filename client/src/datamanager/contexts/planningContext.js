import { createContext } from 'react'

const PlanningContext = createContext({
  programs: [],
  dispatch: (action) => {}
})

export default PlanningContext