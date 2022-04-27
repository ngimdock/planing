import connection from "../utils/index.js";

class SemesterModel {
    /**
     * Initialize the table called Specialite inside the DB
     */
    static async init () {
      const query = `
        CREATE TABLE IF NOT EXISTS Semestre
        (
          idSemestre INTEGER PRIMARY KEY auto_increment,
          valSemestre INTEGER NOT NULL,
          idAnneeAca INTEGER NOT NULL,
          CONSTRAINT FK_SemestreAnneeAcademique 
          FOREIGN KEY(idAnneeAca) REFERENCES AnneeAcademique (idAnneeAca)
        )
      `

      try {
        await connection.execute(query)
  
        console.log("Table Semestre OK")
      } catch (err) {
        console.log(err)
      }
    }
}

export default SemesterModel