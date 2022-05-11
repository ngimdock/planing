import { createContext } from 'react'

const FacultyContext = createContext({
  faculties: [],
  addFaculties: (data) => {},
  addFaculty: (data) => {},
  removeFaculty: (id) => {},
  updateFaculty: (id, data) => {},
  getFaculty: (id) => {}
})

export default FacultyContext