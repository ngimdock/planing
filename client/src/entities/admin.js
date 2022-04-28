// Admin entity

class Admin {
  // Properties
  id
  name
  email
  phone
  sexe

  constructor (data) {
    // Initialization
    this.initialization(data)
  }

  /**
   * Initialize data
   * @param {Object} data 
   */
  initialization (data) {
    const {
      id,
      name,
      email,
      phone,
      sexe
    } = data

    if (
      id &&
      name &&
      email &&
      phone && 
      sexe
    ) {
      this.id = id
      this.name = name
      this.email = email
      this.phone = phone
      this.sexe = sexe
    } else {
      throw new Error("Provide all the required data")
    }
  }

  // Getters
  get getId () {
    return this.id
  }

  get getName () {
    return this.name
  }

  get getEmail () {
    return this.email
  }

  get getPhone () {
    return this.phone
  }

  get getSexe () {
    return this.sexe
  }
}

export default Admin