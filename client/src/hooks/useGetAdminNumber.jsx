import { useContext, useEffect } from "react"
import AuthApi from '../api/auth'
import CurrentUserContext from "../datamanager/contexts/currentUserContext"

const useGetAdminNumber = () => {
  // Get global state
  const { setAdminNumber } = useContext(CurrentUserContext)

  // UseEffect section
  useEffect(() => {
    handleGetAdminNumber()
  }, [])

  // Some handlers
  const handleGetAdminNumber = async () => {
    // Get academic years with semesters
    const { data, error } = await AuthApi.getAll()

    if (data) {
      console.log(data)
      setAdminNumber(data.data.adminNumber)
    }
  }
}

export default useGetAdminNumber














