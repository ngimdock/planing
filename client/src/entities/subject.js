import Semester from './semester'
import Speciality from './speciality'
import Teacher from './teacher'

class Subject {
  code
  description
  teacher
  semester
  speciality

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      code,
      description,
      teacher,
      semester,
      speciality
    } = data

    if (code && description && teacher && semester) {
      this.code = code
      this.description = description
      this.teacher = new Teacher(teacher)
      this.semester = new Semester(semester)

      if (speciality) this.speciality = new Speciality(speciality)
    }
  }

  // Getters
  get getCode () {
    return this.code
  }

  get getDescription () {
    return this.description
  }

  get getTeacher () {
    return this.teacher
  }

}

export default Subject