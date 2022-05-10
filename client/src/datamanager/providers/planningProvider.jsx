import { useReducer } from "react"
import PlanningContext from "../contexts/planningContext"
import reducer from '../reducers/planningReducer'

const PlanningProvider = ({ children }) => {
  // Set local state
  const [programs, dispatch] = useReducer(reducer, [])

  // Context value
  const contextValue = {
    programs,
    dispatch
  }

  return (
    <PlanningContext.Provider value={contextValue}>
      { children }
    </PlanningContext.Provider>
  )
}

export default PlanningProvider