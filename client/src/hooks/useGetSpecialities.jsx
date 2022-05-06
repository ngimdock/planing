import { useContext, useEffect } from "react"
import SpecialityAPI from "../api/speciality"
import SpecialityContext from "../datamanager/contexts/specialityContext"

const useGetSpecialities = () => {
  // Get global state
  const { addSpecialities } = useContext(SpecialityContext)

  useEffect(() => {
    handleGetSpecialities()
  }, [])

  // Some handlers
  const handleGetSpecialities = async () => {
    const { data } = await SpecialityAPI.getAll()

    if (data) {
      // Store specialities inside the global state
      addSpecialities(data)
    }
  }
}

export default useGetSpecialities