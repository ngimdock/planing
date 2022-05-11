import { createContext } from 'react'

const SubjectContext = createContext({
  subjects: [],
  getSubject: (id) => {},
  addSubjects: (data) => {},
  addSubject: (data) => {},
  updateSubject: (id, data) => {},
  removeSubject: (id) => {}
})

export default SubjectContext