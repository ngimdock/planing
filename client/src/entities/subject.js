import Teacher from './teacher'

class Subject {
  code
  description
  teacher

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      code,
      description,
      teacher
    } = data

    if (code && description && teacher) {
      this.code = code
      this.description = description
      this.teacher = new Teacher(teacher)
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