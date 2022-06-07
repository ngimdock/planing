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
      console.log("hello datassss");
      console.log(data);
      const sortedData = data.sort((teacher1, teacher2) => teacher1.nomEns.localeCompare(teacher2.nomEns))
      console.log(sortedData);
      addTeachers(sortedData)
    }
  }
}

export default useGetTeachers