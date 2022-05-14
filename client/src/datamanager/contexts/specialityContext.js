import { createContext } from "react";

const SpecialityContext = createContext({
  specialities: [],
  selectedSpeciality: {},
  setSpeciality: (id, name) => {},
  getSpeciality: (id) => {},
  addSpecialities: (data) => {},
  addSpeciality: (data) => {},
  updateSpeciality: (id, data) => {},
  removeSpeciality: (id) => {}
})

export default SpecialityContext