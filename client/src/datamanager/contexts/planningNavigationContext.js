import { createContext } from "react";

const PlanningNavigationContext = createContext({
  currentPage: "",
  navigateTo: (page) => {}
})

export default PlanningNavigationContext