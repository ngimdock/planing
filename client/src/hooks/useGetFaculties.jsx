import { useContext, useEffect } from "react"
import FacultyAPI from "../api/faculty"
import FacultyContext from "../datamanager/contexts/facultyContext"

const useGetFaculties = () => {
  // Get global state
  const { addFaculties } = useContext(FacultyContext)

  useEffect(() => {
    handleGetFaculties()
  }, [])

  // Some handlers
  const handleGetFaculties = async () => {
    const { data } = await FacultyAPI.getAll()

    if (data) {
      // Store faculties inside the global state
      addFaculties(data)
    }
  }
}

export default useGetFaculties