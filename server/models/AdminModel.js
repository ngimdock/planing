import connection from "../utils/index.js";
import bcrypt from 'bcrypt'

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
        numTelephone INTEGER NOT NULL,
        sexe VARCHAR(20) NOT NULL
      )
    `

    try {
      await connection.query(query)
      console.log("Table Admin OK")

      await AdminModel.createMainAdmin({
        name: "Admin zero",
        password: "admin",
        email: "admin.zero@facsciences-uy1.cm",
        phone: 650123456,
        sexe: "masculin"
      })
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
      INSERT INTO Admin (nomAdmin, passwordAdmin, emailAdmin, numTelephone, sexe)
      VALUES (?, ?, ?, ?, ?)
    `

    try {
      const [rows] = await connection.execute(query, [payload.name, payload.password, payload.email, payload.phone, payload.sexe])

      return { data: { ...rows, password: undefined } }

    } catch (err) {
      console.log(err)

      return { error: "An error occured while creating an admin user" }
    }
  }

  static async createMainAdmin (payload) {
    const query = `
      SELECT *
      FROM Admin
    `

    try {
      const [rows] = await connection.execute(query)

      if (rows.length === 0) {
        bcrypt.hash(payload.password.toLowerCase(), 10, async (err, hash) => {
          if (err) return res.sendStatus(500);
  
          await AdminModel.create({...payload, password: hash})

          console.log("Main Admin User created")
        })
      } else {
        console.log("Main Admin User already exist")
      }
    } catch (err) {
      console.log(err)
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

  /**
   * Get information about the current user
   * @param {string} email
   * @returns 
   */
  static async getCurrentUser (email) {
    const query = `
      SELECT *
      FROM Admin
      WHERE emailAdmin = ?
    `

    try {
      // Execute the query
      const [rows] = await connection.execute(query, [email])

      if (rows.length > 0) {
        return { data: rows[0] }
      } else {
        return { error: "User not found" }
      }

    } catch (err) {
      console.log(err)

      return { error: "An error occured while getting admin's informations" }
    }
  }

  static async signin (email, password) {
    const query = `
      SELECT *
      FROM Admin
      WHERE emailAdmin = ?
      AND passwordAdmin = ?
    `

    try {
      const [rows] = await connection.execute(query, [email, password])

      if (rows.length > 0) {
        return { data: rows[0] }
      }

      return { error: "User not found" }
    } catch (err) {
      console.log(err)

      return { error: "An error occured while login a user" }
    }
  }
}

export default AdminModel