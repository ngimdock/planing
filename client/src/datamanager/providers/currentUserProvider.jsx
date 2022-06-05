import { useState } from "react"
import Admin from "../../entities/admin"
import CurrentUserContext from "../contexts/currentUserContext"

const CurrentUserProvider = ({ children }) => {
  // Set local state
  const [currentUser, setCurrentUser] = useState(null)
  const [adminNumber, setAdminNumber] = useState(0)

  // Some handlers
  const handleLogin = (data) => {
    const userAdmin = new Admin(data)

    setCurrentUser(userAdmin)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const handleSetAdminNumber = (value) => {
    setAdminNumber(value)
  }

  // Context value
  const contextValue = {
    currentUser,
    adminNumber,
    login: handleLogin,
    logout: handleLogout,
    setAdminNumber: handleSetAdminNumber
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider