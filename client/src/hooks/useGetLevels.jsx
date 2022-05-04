import { useContext, useEffect } from "react"
import LevelAPI from "../api/level"
import LevelContext from "../datamanager/contexts/levelContext"

const useGetLevels = () => {
  // Get global state
  const { addLevels } = useContext(LevelContext)

  useEffect(() => {
    handleGetLevels()
  }, [])

  // Some handlers
  const handleGetLevels = async () => {
    const { data } = await LevelAPI.getAll()

    if (data) {
      // Store faculties inside the global state
      addLevels(data)
    }
  }
}

export default useGetLevels