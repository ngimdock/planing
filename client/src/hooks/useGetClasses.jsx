import { useContext, useEffect } from "react"
import ClassAPI from "../api/class"
import ClassContext from "../datamanager/contexts/classContext"

const useGetClasses = () => {
  // Get global state
  const { addClasses } = useContext(ClassContext)

  useEffect(() => {
    handleGetClasses()
  }, [])

  // Some handlers
  const handleGetClasses = async () => {
    const { data } = await ClassAPI.getAll()

    console.log(data)

    if (data) {
      // Store classes inside the global state
      addClasses(data)
    }
  }
}

export default useGetClasses