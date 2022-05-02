// Class Speciality

class Speciality {
  id
  name

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      name
    } = data

    if (id && name) {
      this.id = id
      this.name = name
    }
  }

  // Getters
  get getId () {
    return this.id
  }

  get getName () {
    return this.name
  }
}

export default Speciality