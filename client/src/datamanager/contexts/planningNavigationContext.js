import { createContext } from "react";

const PlanningNavigationContext = createContext({
  currentPage: "",
  academicYear: 0,
  currentClasse: 1,
  navigateTo: (page, data = undefined) => {}
})

export default PlanningNavigationContext