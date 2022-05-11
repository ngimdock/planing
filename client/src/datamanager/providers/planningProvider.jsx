import { useReducer, useState } from "react"
import PlanningContext from "../contexts/planningContext"
import reducer from '../reducers/planningReducer'

const PlanningProvider = ({ children }) => {
  // Set local state
  const [programs, dispatch] = useReducer(reducer, [])
  const [currentSemester, setCurrentSemester] = useState("")
  const [currentClass, setCurrentClass] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // Some handlers
  const handleSetCurrentSemester = (val) => setCurrentSemester(val)
  const handleSetCurrentClass = (myClass) => setCurrentClass(myClass)
  const handleSetLoaded = () => setLoaded(true)

  // Context value
  const contextValue = {
    programs,
    currentSemester,
    currentClass,
    loaded,
    dispatch,
    selectSemester: handleSetCurrentSemester,
    selectClass: handleSetCurrentClass,
    setLoaded: handleSetLoaded
  }

  return (
    <PlanningContext.Provider value={contextValue}>
      { children }
    </PlanningContext.Provider>
  )
}

export default PlanningProvider