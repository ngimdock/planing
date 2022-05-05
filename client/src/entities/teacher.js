class Teacher {
  matricule
  name
  sex

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    const {
      matricule,
      name,
      sex
    } = data

    if (matricule && name && sex) {
      this.matricule = matricule
      this.name = name
      this.sex = sex
    }
  }

  // Getters
  get getMatricule () {
    return this.matricule
  }

  get getName () {
    return this.name
  }

  get getSex () {
    return this.sex
  }
}

export default Teacher