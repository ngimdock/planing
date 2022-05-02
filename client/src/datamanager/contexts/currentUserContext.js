import { createContext } from 'react'

const CurrentUserContext = createContext({
  currentUser: null,
  login: (data) => {},
  logout: () => {}
})

export default CurrentUserContext