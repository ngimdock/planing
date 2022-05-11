class Room {
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

    if (id && name && capacity) {
      this.id = id
      this.name = name
      this.capacity = capacity
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
}

export default Room