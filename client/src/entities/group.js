// Class Group

import Class from './class'
import Speciality from './speciality'

class Group {
  id
  name
  capacity
  myClass
  speciality

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      id,
      name,
      capacity,
      myClass,
      speciality
    } = data

    if (
      id &&
      name &&
      capacity &&
      myClass &&
      speciality
    ) {
      this.id = id
      this.name = name
      this.capacity = capacity
      this.myClass = new Class(myClass)
      this.speciality = new Speciality(speciality)
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
    this.capacity
  }

  get getMyClass () {
    return this.myClass
  }

  get getSpeciality () {
    return this.speciality
  }
}

export default Group
