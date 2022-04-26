import connection from "../utils/index.js";

class AdminModel {
  /**
   * Create the table Admin
   */
  static async init () {
    const query = `
      CREATE TABLE IF NOT EXISTS Admin 
      (
        idAdmin INTEGER PRIMARY KEY auto_increment, 
        nomAdmin VARCHAR(255) NOT NULL,
        passwordAdmin VARCHAR(255) NOT NULL,
        emailAdmin VARCHAR(255) NOT NULL,
        numTelephone INTEGER NOT NULL
      )
    `

    try {
      await connection.query(query)

      console.log("Table Admin OK")
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Create an Administrator user
   * @param {*} payload 
   * @returns 
   */
  static async create (payload) {
    const query = `
      INSERT INTO Admin (nomAdmin, passwordAdmin, emailAdmin, numTelephone)
      VALUES (?, ?, ?, ?)
    `

    try {
      const [rows] = await connection.execute(query, [payload.name, payload.password, payload.email, payload.phone])

      return { data: { ...rows, password: undefined } }

    } catch (err) {
      console.log(err)

      return { error: "An error occured while creating an admin user" }
    }
  }

  /**
   * Verify if an email address has not already been used
   * @param {string} email 
   * @returns 
   */
  static async verifyEmail (email) {
    const query = `
      SELECT * 
      FROM Admin
      WHERE emailAdmin = ?
    `

    try {
      // Execute the query
      const [rows] = await connection.execute(query, [email])

      return { data: rows }
    } catch (err) {
      console.log(err)

      return { error: "An error occured while checking if an email has been already taken" }
    }
  }
}

export default AdminModel