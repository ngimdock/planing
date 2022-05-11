class AcademicYear {
  id
  value

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      value
    } = data

    if (id && data) {
      this.id = id
      this.value =value
    }
  }

  // Getters
  get getId () {
    return this.id
  }

  get getValue () {
    return this.value
  }
}

export default AcademicYear