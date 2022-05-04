import { useContext, useEffect } from "react"
import TeacherAPI from "../api/teacher"
import TeacherContext from "../datamanager/contexts/teacherContext"

const useGetTeachers = () => {
  // Get global state
  const { addTeachers } = useContext(TeacherContext)

  useEffect(() => {
    handleGetTeachers()
  }, [])

  // Some handlers
  const handleGetTeachers = async () => {
    const { data } = await TeacherAPI.getAll()

    if (data) {
      // Store levels inside the global state
      addTeachers(data)
    }
  }
}

export default useGetTeachers