import { useState } from "react"
import Faculty from "../../entities/faculty"
import FacultyContext from "../contexts/facultyContext"

const FacultyProvider = ({ children }) => {
  // Set local state
  const [faculties, setFaculties] = useState([])

  // Some handlers

  /**
   * Get faculty basing on its id
   * @param {number} id 
   * @returns Faculty or null
   */
  const  handleGetFaculty = (id) => {
    const faculty = faculties.find(fac => Number(fac.getId) === Number(id))

    if (faculty) return faculty

    return null
  }

  /**
   * Add a set of faculties
   * @param {Array} data 
   */
  const handleAddFaculties = (data) => {
    const faculties = data.map(fac => {
      return new Faculty({ id: fac.idFil, name: fac.nomFil })
    })

    setFaculties(faculties)
  }

  /**
   * Add a single faculty
   * @param {Object} data 
   */
  const handleAddFaculty = (data) => {
    const {
      id,
      name
    } = data

    console.log({data})

    if (id && name) {
      const faculty = new Faculty(data)

      const facultiesPrevState = [...faculties]

      facultiesPrevState.push(faculty)

      setFaculties(facultiesPrevState)
    }
  }

  const handleUpdateFaculty = (id, data) => {
    // Nothing
  }

  /**
   * Delete a faculty from the global state
   * @param {number} id 
   */
  const handleRemoveFaculty = (id) => {
    const facultiesPrevState = [...faculties]

    const index = facultiesPrevState.findIndex(fac => Number(fac.getId) === Number(id))

    if (index > -1) {
      facultiesPrevState.splice(index, 1)

      setFaculties(facultiesPrevState)
    }
  }

  // Context value
  const contextValue = {
    faculties,
    getFaculty: handleGetFaculty,
    addFaculties: handleAddFaculties,
    addFaculty: handleAddFaculty,
    updateFaculty: handleUpdateFaculty,
    removeFaculty: handleRemoveFaculty
  }

  return (
    <FacultyContext.Provider value={contextValue}>
      { children }
    </FacultyContext.Provider>
  )
}

export default FacultyProvider