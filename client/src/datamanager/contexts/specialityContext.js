import { createContext } from "react";

const SpecialityContext = createContext({
  specialities: [],
  getSpeciality: (id) => {},
  addSpecialities: (data) => {},
  addSpeciality: (data) => {},
  updateSpeciality: (id, data) => {},
  removeSpeciality: (id) => {}
})

export default SpecialityContext