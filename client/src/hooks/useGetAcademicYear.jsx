import { useContext, useEffect } from "react"
import AcademicYearAPI from "../api/academicYear"
import PlanningAction from "../datamanager/actions/planning"
import PlanningContext from "../datamanager/contexts/planningContext"

const useGetAcademicYear = () => {
  // Get global state
  const { dispatch } = useContext(PlanningContext)

  // UseEffect section
  useEffect(() => {
    handleGetAcademicYears()
  }, [])

  // Some handlers
  const handleGetAcademicYears = async () => {
    // Get academic years with semesters
    const { data, error } = await AcademicYearAPI.getAll()

    if (data) {
      const academicYears = []

      data.forEach(acaY => {
        // Initialization of an academic year data
        const academicYear = {
          id: acaY.idAnneeAca,
          value: acaY.valAnneeAca,
          semesters: []
        }

        const semesters = []

        acaY.semestres.forEach((semester) => {
          // Initialization of a semester data
          const semesterValue = {
            id: semester.idSemestre,
            value: "Semestre " + semester.valSemestre,
            faculties: []
          }

          semesters.push(semesterValue)
        })

        academicYear.semesters = semesters

        academicYears.push(academicYear)
      })

      dispatch(PlanningAction.addAcademicYears(academicYears))
    }
  }
}

export default useGetAcademicYear














