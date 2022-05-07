import { useContext, useEffect } from "react"
import SubjectAPI from "../api/subject"
import ClassContext from "../datamanager/contexts/classContext"

const useGetSubjects = () => {
  // Get global state
  // const { addClasses } = useContext(ClassContext)

  useEffect(() => {
    handleGetSubjects()
  }, [])

  // Some handlers
  const handleGetSubjects = async () => {
    const { data } = await SubjectAPI.getAll()

    if (data) {
      // Store classes inside the global state
      // addClasses(data)

      console.log(data)
    }
  }
}

export default useGetSubjects