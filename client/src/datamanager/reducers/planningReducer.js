// Reducer
const planningReducer = (state = [], action) => {
  const prevState = [...state]

  switch (action.type) {
    case "ADD_ACADEMIC_YEARS": {
      return action.payload
    }

    case "ADD_ACADEMIC_YEAR": {
      const {
        id,
        value
      } = action.payload

      if (id && value) {
        // New academic year
        const academicYear = {
          id,
          headerTitle: value,
          semesters: []
        }

        prevState.push(academicYear)
      }

      return prevState
    }

    case "ADD_SEMESTER": {
      const {
        idAcademicYear,
        idSemester,
        value
      } = action.payload

      if (idAcademicYear && idSemester && value) {
        // Get the index of the academic year
        const index = prevState.findIndex(acaY => Number(acaY.id) === Number(idAcademicYear))

        if (index > -1) {
          // New semester
          const semester = {
            id: idSemester,
            value,
            faculties: []
          }

          prevState[index].semesters.push(semester)
        }
      }

      return prevState
    }

    case "ADD_FACULTIES": {
      const {
        faculties
      } = action.payload

      // Loop throught academics years
      for (let acaYIndex in prevState) {

        // Loop throught semester
        for (let semesterIndex in prevState[acaYIndex].semesters) {
          prevState[acaYIndex].semesters[semesterIndex].faculties = faculties
        }
      } 

      return prevState
    }

    case "ADD_FACULTY": {
      const {
        idAcademicYear,
        idSemester,
        idFaculty,
        value
      } = action.payload

      if (idAcademicYear && idSemester && idFaculty && value) {
        // Get the index of the academic year
        const acaYIndex = prevState.findIndex(acaY => Number(acaY.id) === Number(idAcademicYear))

        if (acaYIndex > -1) {
          // Get the index of the semester
          const semesterIndex = prevState[acaYIndex].semesters.findIndex(semester => Number(semester.id) === Number(idSemester))

          if (semesterIndex > -1) {
            // New faculty
            const faculty = {
              id: idFaculty,
              value,
              classes: []
            }

            prevState[acaYIndex].semesters[semesterIndex].faculties.push(faculty)
          }
        }
      }

      return prevState
    }

    case "ADD_CLASS": {

    }

    case "ADD_PROGRAM": {

    }

    default: return prevState
  }
}

export default planningReducer