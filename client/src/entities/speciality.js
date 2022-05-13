// Class Speciality

import Group from "./group"

class Speciality {
  id
  name
  capacity
  groups

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      name,
      capacity,
      groups
    } = data

    if (id && name) {
      this.id = id
      this.name = name
      this.capacity = capacity ? capacity : null

      if (groups && groups.length > 0) {
        this.groups = groups.map(group => new Group(group))
      } else {
        this.groups = []
      }
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