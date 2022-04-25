import { createContext } from "react";

const NavigationContext = createContext({
  currentPage: 'dashboard',
  isOpen: true,
  navigateTo: (target) => {},
  toggleNavigation: (value = undefined) => {}
})

export default NavigationContext