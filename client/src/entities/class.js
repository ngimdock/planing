// class Class

import Faculty from "./faculty"
import Group from "./group"
import Level from "./level"
import Speciality from "./speciality"

class Class {
  code
  name
  capacity
  faculty
  level
  specialities
  programs

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
      groups,
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
      this.programs = {
        "Lundi": [],
        "Mardi": [],
        "Mercredi": [],
        "Jeudi": [],
        "Vendredi": [],
        "Samedi": [],
        "Dimanche": []
      }

      if (groups.length > 0) {
        this.groups = groups.map(group => new Group(group))
      } else {
        this.groups = []
      }

      if (specialities.length > 0) {
        this.specialities = specialities.map(spec => new Speciality(spec))
      } else {
        this.specialities = []
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

  get getGroups () {
    return this.groups
  }
}

export default Class