import { useState } from "react"
import Class from "../../entities/class"
import ClassContext from "../contexts/classContext"

const ClassProvider = ({ children }) => {
  // Set local state
  const [classes, setClasses] = useState([])

  // Some handlers
  const handleGetClass = (id) => {
    const myClass = classes.find(cl => cl.getCode === id)

    if (myClass) return myClass

    return null
  }

  /**
   * Add the entire list of rooms
   * @param {Array} data 
   */
  const handleAddClasses = (data) => {
    const classes = data.map(myClass => {
      // Format specialities
      const specialities = myClass.specialities.map(spec => ({
        id: spec.idSpecialite,
        name: spec.nomSpecialite,
        capacity: spec.capacite,
        groups: spec.groups.map(group => ({
          id: group.idGroupe,
          name: group.nomGroupe,
          capacity: group.capaciteGroupe,
          speciality: group.idSpecialite
        }))
      }))

      // Format groups
      const groups = myClass.groups.map(group => {
        return ({
          id: group.idGroupe,
          name: group.nomGroupe,
          capacity: group.capaciteGroupe,
          speciality: group.idSpecialite
        })
      })

      const classPayload = {
        code: myClass.codeClasse,
        name: myClass.nomClasse,
        capacity: myClass.capaciteClasse,
        faculty: {
          id: myClass.idFil,
          name: myClass.nomFil
        },
        level: {
          id: myClass.idNiv,
          name: myClass.nomNiv
        },
        specialities,
        groups
      }
      return new Class(classPayload)
    })

    setClasses(classes)
  }

  /**
   * Add the single room
   * @param {Object} data 
   */
  const handleAddClass = (data) => {
    const {
      code,
      name,
      capacity,
      faculty,
      level
    } = data

    if (
      code &&
      name &&
      capacity &&
      faculty &&
      level
    ) {
      const myClass = new Class(data)

      const classesPrevState = [...classes]

      classesPrevState.push(myClass)

      setClasses(classesPrevState)
    }
  }

  const handleUpdateClass = (data) => {
    const {
      code,
      name,
      capacity,
      faculty,
      level
    } = data

    if (
      code &&
      name &&
      capacity &&
      faculty &&
      level
    ) {
      const myClass = new Class(data)

      const classesPrevState = [...classes]

      classesPrevState.push(myClass)

      setClasses(classesPrevState)
    }

  }

  const handleRemoveClass = (idObject) => {
    const {code} = idObject
    if(code){
      
    }

  }

  // Context value
  const contextValue = {
    classes,
    getClass: handleGetClass,
    addClasses: handleAddClasses,
    addClass: handleAddClass,
    updateClass: handleUpdateClass,
    removeClass: handleRemoveClass
  }

  return (
    <ClassContext.Provider value={contextValue}>
      { children }
    </ClassContext.Provider>
  )
}

export default ClassProvider