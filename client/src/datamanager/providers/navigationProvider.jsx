import { useState } from "react"
import NavigationContext from "../contexts/navigationContext"

const NavigationProvider = ({ children }) => {
  // Set local state
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isOpen, setIsOpen] = useState(false)

  // Some handlers
  const handleNavigateTo = (target) => {
    setCurrentPage(target)
  }

  const handleToggleNavigation = (value = undefined) => {
    if (value !== undefined)
      setIsOpen(value)
    else  
      setIsOpen(prev => !prev)
  }

  // Context value
  const contextValue = {
    currentPage,
    isOpen,
    navigateTo: handleNavigateTo,
    toggleNavigation: handleToggleNavigation
  }

  return (
    <NavigationContext.Provider value={contextValue}>
      { children }
    </NavigationContext.Provider>
  )
}

export default NavigationProvider