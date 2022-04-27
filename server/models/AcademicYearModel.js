import connection from "../utils/index.js";

class AcademicYearModel {
    /**
     * Initialize the table called Specialite inside the DB
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
  
        console.log("Table AnneeAcademique OK")
      } catch (err) {
        console.log(err)
      }
    }
}

export default AcademicYearModel