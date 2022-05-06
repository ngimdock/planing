import { useState } from "react"
import Class from "../../entities/class"
import ClassContext from "../contexts/classContext"

const ClassProvider = ({ children }) => {
  // Set local state
  const [classes, setClasses] = useState([])

  // Some handlers
  const handleGetClass = (id) => {
    const myClass = classes.find(lev => Number(lev.getId) === Number(id))

    if (myClass) return myClass

    return null
  }

  /**
   * Add the entire list of rooms
   * @param {Array} data 
   */
  const handleAddClasses = (data) => {
    const classes = data.map(room => {
      return new Class({ id: room.idSalle, name: room.nomSal, capacity: room.capaciteSal })
    })

    setRooms(classes)
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

      setRooms(classesPrevState)
    }
  }

  const handleUpdateClass = (id, data) => {
    // nothing
  }

  const handleRemoveClass = (id) => {
    // nothing
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