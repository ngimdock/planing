import connection from "../utils/index.js";

class AcademicYearModel {
  /**
   * Initialize the table called AnneeAcademique inside the DB
   */
  static async init () {
    const query = `
      CREATE TABLE IF NOT EXISTS AnneeAcademique
      (
        idAnneeAca INTEGER PRIMARY KEY auto_increment,
        valAnneeAca VARCHAR(255) NOT NULL
      )
    `

    try {
      await connection.execute(query)
      // const result = await AcademicYearModel.isEmpty()

      // if (result)
        // await AcademicYearModel.create()

      console.log("Table AnneeAcademique OK")
    } catch (err) {
      console.log(err)
    }
  }

  static async create (academicYear) {
    const query = `
      INSERT INTO AnneeAcademique (valAnneeAca)
      VALUES (?)
    `

    try { 
      const [rows] = await connection.execute(query, [academicYear])

      console.log(rows)

      return { data: {id: rows.insertId} }
    } catch (err) {
      console.error(err)

      return { error: "An error occured" }
    }
  }

  static async isEmpty () {
    const query = "SELECT * FROM AnneeAcademique"

    try {
      const [rows] = await connection.execute(query)

      if (rows.length > 0) {
        return false
      }

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }
}

export default AcademicYearModel