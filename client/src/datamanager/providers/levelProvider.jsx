import { useState } from "react"
import Level from "../../entities/level"
import LevelContext from "../contexts/levelContext"

const LevelProvider = ({ children }) => {
  // Set local state
  const [levels, setLevels] = useState([])
  const [selectedLevel, setSelectedLevel] = useState({})

  // Some handlers
  const handleGetLevel = (id) => {
    const level = levels.find(lev => Number(lev.getId) === Number(id))

    if (level) return level

    return null
  }



  const handleAddLevels = (data) => {
    const levels = data.map(lev => {
      return new Level({ id: lev.idNiv, name: lev.nomNiv })
    })

    setLevels(levels)
  }

  const handleAddLevel = (data) => {
    const {
      id,
      name
    } = data

    if (id && name) {
      const level = new Level(data)

      const levelsPrevState = [...levels]

      levelsPrevState.push(level)

      setLevels(levelsPrevState)
      console.log(levels)
    }
  }

  const handleUpdateLevel = (id, name) => {

    if (id && name) {
      levels.forEach(lev =>{
        if (lev.id === id) {
          lev.name = name
        }
      })
      setLevels(levels)
    }
    
  }

  const handleRemoveLevel = (id) => {

    const levelNewState = []

    if (id) {
      console.log(id)
      const levelsPrevState = [...levels]

      levelsPrevState.forEach(lev =>{
        if ( lev.id !== id ) {
          levelNewState.push(lev)
        }
      })
      setLevels(levelNewState)
    }
    
  }

  // Context value
  const contextValue = {
    levels,
    selectedLevel,
    getLevel: handleGetLevel,
    setLevel: setSelectedLevel,
    addLevels: handleAddLevels,
    addLevel: handleAddLevel,
    removeLevel: handleRemoveLevel,
    updateLevel: handleUpdateLevel
  }

  return (
    <LevelContext.Provider value={contextValue}>
      { children }
    </LevelContext.Provider>
  )
}

export default LevelProvider