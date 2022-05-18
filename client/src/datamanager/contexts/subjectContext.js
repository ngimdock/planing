import { createContext } from 'react'

const SubjectContext = createContext({
  subjects: [],
  selectedSubject: {},
  selectSubject: (codeSubject, data) => {},
  getSubject: (id) => {},
  addSubjects: (data) => {},
  addSubject: (data) => {},
  updateSubject: (id, data) => {},
  removeSubject: (id) => {}
})

export default SubjectContext