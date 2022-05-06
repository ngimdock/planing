// Class Speciality

class Speciality {
  id
  name
  capacity

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      name,
      capacity
    } = data

    if (id && name) {
      this.id = id
      this.name = name
      this.capacity = capacity ? capacity : null
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