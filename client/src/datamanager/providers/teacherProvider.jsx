import { useState } from "react"
import Teacher from "../../entities/teacher"
import TeacherContext from "../contexts/teacherContext"

const TeacherProvider = ({ children }) => {
  // Set local state
  const [teachers, setTeachers] = useState([])

  // Some handlers

  /**
   * Get a single teacher
   * @param {number} id 
   * @returns 
   */
  const handleGetTeacher = (id) => {
    const teacher = teachers.find(teach => Number(teach.getMatricule) === Number(id))

    if (teacher) return teacher

    return null
  }

  /**
   * Add a list of teachers
   * @param {Array} data 
   */
  const handleAddTeachers = (data) => {
    const teachers = data.map(teach => {
      return new Teacher({ matricule: teach.matriculeEns, name: teach.nomEns, sex: teach.sexEns })
    })

    setTeachers(teachers)
  }

  /**
   * Add a single teacher
   * @param {Object} data 
   */
  const handleAddTeacher = (data) => {
    const {
      matricule,
      name,
      sex
    } = data

    if (matricule && name && sex) {
      const teacher = new Teacher(data)

      const teachersPrevState = [...teachers]

      teachersPrevState.push(teacher)

      setTeachers(teachersPrevState)
    }
  }


  /**
   * Update a teacher
   * @param {number} id 
   * @param {Object} data 
   */
  const handleUpdateTeacher = (id, data) => {
    // nothing
  }

  const handleRemoveTeacher = (id) => {
    if(id) {
      const teacherPrevState = [...teachers]

      const teacherIndex = teacherPrevState.findIndex(checkTeacherPosition)

      function checkTeacherPosition(teacher) {
        return teacher.matricule === id
      }

      teacherPrevState.splice(teacherIndex, 1)
      setTeachers(teacherPrevState)
    }
  }

  // Context value
  const contextValue = {
    teachers,
    getTeacher: handleGetTeacher,
    addTeachers: handleAddTeachers,
    addTeacher: handleAddTeacher,
    updateTeacher: handleUpdateTeacher,
    removeTeacher: handleRemoveTeacher
  }

  return (
    <TeacherContext.Provider value={contextValue}>
      { children }
    </TeacherContext.Provider>
  )
}

export default TeacherProvider