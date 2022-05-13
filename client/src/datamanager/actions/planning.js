class PlanningAction {
  static addAcademicYears = (data) => ({
    type: "ADD_ACADEMIC_YEARS",
    payload: data
  })

  static addAcademicYear = (data) => {
    const {
      id,
      value
    } = data

    console.log({data})

    if (id && value) {
      return ({
        type: "ADD_ACADEMIC_YEAR",
        payload: data
      })
    }

    return ({
      type: "NOTHING"
    })
  }

  static addSemester = (data) => {
    const {
      idAcademicYear,
      idSemester,
      value
    } = data

    if (idAcademicYear && idSemester && value) {
      return ({
        type: "ADD_SEMESTER",
        payload: data
      })
    }
  }

  static addFaculties = (data) => {
    const {
      faculties
    } = data

    if (faculties.length > 0) {
      return ({
        type: "ADD_FACULTIES",
        payload: data
      })
    }

    return ({
      type: "NOTHING"
    })
  }

  static addFaculty = (data) => {
    const {
      idAcademicYear,
      idSemester,
      idFaculty,
      value
    } = data

    if (
      idAcademicYear &&
      idSemester &&
      idFaculty &&
      value
    ) {
      return ({
        type: "ADD_FACULTY",
        payload: data
      })
    }

    return ({
      type: "NOTHING"
    })
  }

  static addClass = (idAcademicYear, idSemester, data) => {
    const { id: idFaculty } = data

    console.log(idFaculty)

    if (idAcademicYear && idSemester && idFaculty) {
      return ({
        type: "ADD_CLASS",
        payload: {
          idAcademicYear,
          idSemester,
          data
        }
      })
    } 

    return ({
      type: "NOTHING"
    })
  }
}

export default PlanningAction