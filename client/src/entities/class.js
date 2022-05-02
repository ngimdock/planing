// class Class

class Class {
  code
  name
  capacity
  faculty
  level

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      code,
      name,
      capacity,
      faculty,
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
      this.faculty = faculty
      this.level
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
}

export default Class