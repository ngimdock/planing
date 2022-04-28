import Admin from "../../entities/admin"
import CurrentUserContext from "../contexts/currentUserContext"

const CurrentUserProvider = ({ children }) => {
  // Set local state
  const [currentUser, setCurrentUser] = useState(null)

  // Some handlers
  const handleLogin = (data) => {
    const userAdmin = new Admin(data)

    setCurrentUser(userAdmin)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  // Context value
  const contextValue = {
    currentUser,
    login: handleLogin,
    logout: handleLogout
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      { children }
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider