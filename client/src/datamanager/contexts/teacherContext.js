import { createContext } from "react";

const TeacherContext = createContext({
  teachers: [],
  getTeacher: (id) => {},
  addTeachers: (data) => {},
  addTeacher: (data) => {},
  updateTeacher: (id, data) => {},
  removeTeacher: (id) => {}
})

export default TeacherContext