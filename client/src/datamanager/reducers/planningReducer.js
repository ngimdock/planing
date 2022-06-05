// Reducer
const planningReducer = (state = [], action) => {
  const prevState = [...state];

  switch (action.type) {
    case "ADD_ACADEMIC_YEARS": {
      return action.payload;
    }

    case "ADD_ACADEMIC_YEAR": {
      const { id, value } = action.payload;

      if (id && value) {
        // New academic year
        const academicYear = {
          id,
          value,
          semesters: [],
        };

        prevState.push(academicYear);
      }

      return prevState;
    }

    case "ADD_SEMESTER": {
      const { idAcademicYear, idSemester, value } = action.payload;

      if (idAcademicYear && idSemester && value) {
        // Get the index of the academic year
        const index = prevState.findIndex(
          (acaY) => Number(acaY.id) === Number(idAcademicYear)
        );

        if (index > -1) {
          // New semester
          const semester = {
            id: idSemester,
            value,
            faculties: [],
          };

          prevState[index].semesters.push(semester);
        }
      }

      return prevState;
    }

    case "ADD_FACULTIES": {
      const { faculties } = action.payload;

      // Loop throught academics years
      for (let acaYIndex in prevState) {
        // Loop throught semester
        for (let semesterIndex in prevState[acaYIndex].semesters) {
          prevState[acaYIndex].semesters[semesterIndex].faculties = faculties;
        }
      }

      return prevState;
    }

    case "ADD_FACULTY": {
      const { idAcademicYear, idSemester, idFaculty, value } = action.payload;

      if (idAcademicYear && idSemester && idFaculty && value) {
        // Get the index of the academic year
        const acaYIndex = prevState.findIndex(
          (acaY) => Number(acaY.id) === Number(idAcademicYear)
        );

        if (acaYIndex > -1) {
          // Get the index of the semester
          const semesterIndex = prevState[acaYIndex].semesters.findIndex(
            (semester) => Number(semester.id) === Number(idSemester)
          );

          if (semesterIndex > -1) {
            // New faculty
            const faculty = {
              id: idFaculty,
              value,
              classes: [],
            };

            prevState[acaYIndex].semesters[semesterIndex].faculties.push(
              faculty
            );
          }
        }
      }

      return prevState;
    }

    case "ADD_CLASS": {
      const {
        idAcademicYear,
        idSemester,
        data: { id: idFaculty },
        data,
      } = action.payload;

      // Get the index of the academic year
      const acaYIndex = prevState.findIndex(
        (acaY) => Number(acaY.id) === Number(idAcademicYear)
      );

      if (acaYIndex > -1) {
        // Get the index of the semester
        const semesterIndex = prevState[acaYIndex].semesters.findIndex(
          (semester) => Number(semester.id) === Number(idSemester)
        );

        if (semesterIndex > -1) {
          // Get the index of the faculty
          const facIndex = prevState[acaYIndex].semesters[
            semesterIndex
          ].faculties.findIndex((fac) => Number(fac.id) === Number(idFaculty));

          if (facIndex > -1) {
            // Get the index of the class
            const classIndex = prevState[acaYIndex].semesters[
              semesterIndex
            ].faculties[facIndex].classes.findIndex(
              (c) => c.code === data.classes[0].code
            );

            console.log({
              classIndex,
              classe: data.classes[0],
              prevState:
                prevState[acaYIndex].semesters[semesterIndex].faculties[
                  facIndex
                ].classes,
            });

            if (classIndex > -1) {
              prevState[acaYIndex].semesters[semesterIndex].faculties[
                facIndex
              ].classes[classIndex].programs = data.classes[0].programs;
            } else {
              prevState[acaYIndex].semesters[semesterIndex].faculties[
                facIndex
              ].classes.push(data.classes[0]);
            }
          }
        }
      }

      return prevState;
    }

    case "ADD_PROGRAM": {
    }

    case "REMOVE_PROGRAM": {
      const {
        subjectCode,
        roomId,
        day,
        teacherMatricule,
        idSemester,
        idYear,
        startHour,
        codeClass,
        facultyId,
      } = action.payload;

      console.log(action.payload);

      // Get the index of the academic year
      const acaYIndex = prevState.findIndex(
        (acaY) => Number(acaY.id) === Number(idYear)
      );

      if (acaYIndex > -1) {
        // Get the index of the semester
        const semesterIndex = prevState[acaYIndex].semesters.findIndex(
          (semester) => Number(semester.id) === Number(idSemester)
        );

        if (semesterIndex > -1) {
          // Get the index of the faculty
          const facIndex = prevState[acaYIndex].semesters[
            semesterIndex
          ].faculties.findIndex((fac) => Number(fac.id) === Number(facultyId));

          if (facIndex > -1) {
            // Get the index of the class
            const classIndex = prevState[acaYIndex].semesters[
              semesterIndex
            ].faculties[facIndex].classes.findIndex(
              (c) => c.code === codeClass
            );

            if (classIndex > -1) {
              const programIndex = prevState[acaYIndex].semesters[
                semesterIndex
              ].faculties[facIndex].classes[classIndex].programs[day].findIndex(
                (prog) => {
                  if (
                    prog.subjectCode === subjectCode &&
                    +prog.roomId === +roomId &&
                    prog.teacherMatricule === teacherMatricule &&
                    +startHour === +prog.startHour
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                }
              );

              console.log({ programIndex });

              if (programIndex > -1) {
                const newProgram = prevState[acaYIndex].semesters[
                  semesterIndex
                ].faculties[facIndex].classes[classIndex].programs[day].splice(
                  programIndex,
                  1
                );

                prevState[acaYIndex].semesters[semesterIndex].faculties[
                  facIndex
                ].classes[classIndex].programs[day] = newProgram;
              }
            }
          }
        }
      }

      return prevState;
    }

    default:
      return prevState;
  }
};

export default planningReducer;
