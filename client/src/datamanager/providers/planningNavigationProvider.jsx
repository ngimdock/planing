import { useState } from "react"
import PlanningNavigationContext from "../contexts/planningNavigationContext"

const PlanningNavigationProvider = ({ children }) => {
  // Set Local state
  const [currentPage, setCurrentPage] = useState("semesters")

  // Some handlers
  const handleNavigateTo = (page) => {
    setCurrentPage(page)
  }

  // Context value
  const contextValue = {
    currentPage,
    navigateTo: handleNavigateTo
  }

  return (
    <PlanningNavigationContext.Provider value={contextValue}>
      { children }
    </PlanningNavigationContext.Provider>
  )
}

export default PlanningNavigationProvider