import { useContext, useEffect } from "react"
import SubjectAPI from "../api/subject"
import ClassContext from "../datamanager/contexts/classContext"
import SubjectContext from "../datamanager/contexts/subjectContext"

const useGetSubjects = () => {
  // Get global state
  const { addSubjects } = useContext(SubjectContext)

  useEffect(() => {
    handleGetSubjects()
  }, [])

  // Some handlers
  const handleGetSubjects = async () => {
    const { data } = await SubjectAPI.getAll()

    if (data) {
      // Store classes inside the global state
      addSubjects(data)
    }
  }
}

export default useGetSubjects