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
  const handleGetClass = (payload) => {
    const {
      idAcademicYear,
      idSemester,
      idFaculty,
      codeClass
    } = payload

    const prevState = [...programs]

    // Get the index of the academic year
    const acaYIndex = prevState.findIndex(acaY => Number(acaY.id) === Number(idAcademicYear))

    if (acaYIndex > -1) {
      // Get the index of the semester
      const semesterIndex = prevState[acaYIndex].semesters.findIndex(semester => Number(semester.id) === Number(idSemester))
   
      if (semesterIndex > -1) {
        // Get the index of the faculty
        const facIndex = prevState[acaYIndex].semesters[semesterIndex].faculties.findIndex(fac => Number(fac.id) === Number(idFaculty))
     
        if (facIndex > -1) {
          // Get the index of the class
          const classIndex = prevState[acaYIndex].semesters[semesterIndex].faculties[facIndex].classes.findIndex(c => c.code === codeClass)
          
          if (classIndex > -1) {

            return prevState[acaYIndex].semesters[semesterIndex].faculties[facIndex].classes[classIndex]
          }
        }
      }
    }

    return null
  }

  // Context value
  const contextValue = {
    programs,
    currentSemester,
    currentClass,
    loaded,
    dispatch,
    selectSemester: handleSetCurrentSemester,
    selectClass: handleSetCurrentClass,
    getClass: handleGetClass,
    setLoaded: handleSetLoaded
  }

  return (
    <PlanningContext.Provider value={contextValue}>
      { children }
    </PlanningContext.Provider>
  )
}

export default PlanningProvider