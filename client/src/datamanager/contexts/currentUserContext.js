import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: null,
  adminNumber: 0,
  login: (data) => {},
  logout: () => {},
  setAdminNumber: (value) => {},
});

export default CurrentUserContext;
