import { useState } from "react"
import Subject from "../../entities/subject"
import SubjectContext from "../contexts/subjectContext"

const SubjectProvider = ({ children }) => {
  // Set local state
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)

  // Some handlers
  const handleGetSubject = (id) => {
    const subject = subjects.find(sub => Number(sub.getCode) === Number(id))

    if (subject) return subject

    return null
  }

  const handleSelectSubject = (codeSubject) => {

    if(!codeSubject) return;

    const subject = subjects.find(subject => subject.getCode === codeSubject)

    if(subject) setSelectedSubject(subject)
  }

  const handleUpdateSubject = (codeSubject, newData) => {

    const {
      code,
      description,
      speciality
    } = newData

    if(!codeSubject || !code || !description) return;

    // get the subject position
    const indexSubject = subjects.findIndex(subject => subject.getCode === codeSubject)

    if(indexSubject > -1){
      const newSubjects = [...subjects]
      newSubjects[indexSubject] = new Subject(newData)

      //update subject
      setSubjects(newSubjects)
    }
  }

  /**
   * Add the entire list of rooms
   * @param {Array} data 
   */
  const handleAddSubjects = (data) => {
    const subjects = data.map(subject => {
      // Format specialities

      const subjectPayload = {
        code: subject.codeCours,
        description: subject.descriptionCours,
        speciality: subject.idSpecialite && {
          id: subject.idSpecialite,
          name: subject.nomSpecialite
        }
      }

      return new Subject(subjectPayload)
    })

    setSubjects(subjects)
  }

  /**
   * Add the single room
   * @param {Object} data 
   */
  const handleAddSubject = (data) => {
    const {
      code,
      description,
      speciality
    } = data

    if (
      code &&
      description
    ) {
      const subject = new Subject(data)

      const subjectsPrevState = [...subjects]

      subjectsPrevState.push(subject)

      setSubjects(subjectsPrevState)
    }
  }

  const handleRemoveSubject = (codeSubject) => {
    
    const newSubjects = subjects.filter(subject => subject.code !== codeSubject)

    setSubjects(newSubjects)
  }

  // Context value
  const contextValue = {
    subjects,
    selectedSubject,
    getSubject: handleGetSubject,
    selectSubject: handleSelectSubject,
    addSubjects: handleAddSubjects,
    addSubject: handleAddSubject,
    updateSubject: handleUpdateSubject,
    removeSubject: handleRemoveSubject
  }

  return (
    <SubjectContext.Provider value={contextValue}>
      { children }
    </SubjectContext.Provider>
  )
}

export default SubjectProvider