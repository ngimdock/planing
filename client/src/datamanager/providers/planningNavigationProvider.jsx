import { useState } from "react"
import PlanningNavigationContext from "../contexts/planningNavigationContext"

const PlanningNavigationProvider = ({ children }) => {
  // Set Local state
  const [currentPage, setCurrentPage] = useState("semesters")
  const [academicYear, setAcademicYear] = useState(0)
  const [currentClass, setCurrentClass] = useState(0)

  // Some handlers
  const handleNavigateTo = (page, data = undefined) => {
    if (data) {
      const { field, value } = data
  
      switch (field) {
        case "ACADEMIC_YEAR": {
          setAcademicYear(value)
          break
        }

        case "CLASS": {
          setCurrentClass(value)
          break
        }
  
        default: break
      }
    }

    setCurrentPage(page)
  }

  // Context value
  const contextValue = {
    currentPage,
    academicYear,
    currentClass,
    navigateTo: handleNavigateTo
  }

  return (
    <PlanningNavigationContext.Provider value={contextValue}>
      { children }
    </PlanningNavigationContext.Provider>
  )
}

export default PlanningNavigationProvider