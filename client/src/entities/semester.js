import AcademicYear from "./academicYear"

class Semester {
  id
  value
  // year

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      value,
      // year
    } = data

    if (id && value) {
      this.id = id
      this.value = value
      // this.year = new AcademicYear(year)
    }
  }

  // Getters
  get getId () {
    return this.id
  }

  get getValue () {
    return this.value
  }

  // get getYear () {
  //   return this.year
  // }
}

export default Semester