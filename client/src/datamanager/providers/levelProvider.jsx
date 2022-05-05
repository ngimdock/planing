import { useState } from "react"
import Level from "../../entities/level"
import LevelContext from "../contexts/levelContext"

const LevelProvider = ({ children }) => {
  // Set local state
  const [levels, setLevels] = useState([])

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
    }
  }

  const handleUpdateLevel = (id, name) => {
    // nothing
  }

  const handleRemoveLevel = (id) => {
    // nothing
  }

  // Context value
  const contextValue = {
    levels,
    getLevel: handleGetLevel,
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