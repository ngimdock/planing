class Group {
  id
  name
  capacity
  speciality

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      name,
      capacity,
      speciality
    } = data

    if (
      id &&
      name &&
      capacity
    ) {
      this.id = id
      this.name = name
      this.capacity = capacity
      this.speciality = speciality
    }
  }

  // Getters
  get getId () {
    return this.id
  }

  get getName () {
    return this.name
  }

  get getCapacity () {
    return this.capacity
  }

  get getSpeciality () {
    return this.speciality
  }
}

export default Group
