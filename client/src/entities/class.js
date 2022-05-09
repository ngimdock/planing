// class Class

import Faculty from "./faculty"
import Level from "./level"
import Speciality from "./speciality"

class Class {
  code
  name
  capacity
  faculty
  level
  specialities

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      code,
      name,
      capacity,
      faculty,
      specialities,
      level
    } = data

    if (
      code &&
      name &&
      capacity &&
      faculty &&
      level
    ) {
      this.code = code
      this.name = name
      this.capacity = capacity
      this.faculty = new Faculty(faculty)
      this.level = new Level(level)

      if (specialities.length > 0) {
        this.specialities = specialities.map(spec => new Speciality(spec))
      }
    }
  }

  // Getters
  get getCode () {
    return this.code
  }

  get getName () {
    return this.name
  }

  get getCapacity () {
    return this.capacity
  }

  get getFaculty () {
    return this.faculty
  }

  get getLevel () {
    return this.level
  }

  get getSpecialities () {
    return this.specialities
  }
}

export default Class