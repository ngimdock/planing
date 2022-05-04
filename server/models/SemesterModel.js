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
        ON DELETE CASCADE
        ON UPDATE CASCADE
      )
    `

    try {
      await connection.execute(query)

      console.log("Table Semestre OK")
    } catch (err) {
      console.log(err)
    }
  }

  static async findAll () {
    const query = `
      SELECT * 
      FROM Semestre S, AnneeAcademique A
      WHERE S.idAnneeAca = A.idAnneeAca
      ORDER BY A.valAnneeAca ASC
    `

    try {
      const [rows] = await connection.execute(query)

      return { data: rows }
    } catch (err) {
      console.error(err)

      return { error: "An error occured while find all semesters" }
    }
  }

  static async create (payload) {
    const {
      semester,
      idAcademicYear
    } = payload

    const query = `
      INSERT INTO Semestre (valSemestre, idAnneeAca)
      VALUES (?, ?)
    `

    try {
      const [rows] = await connection.execute(query, [semester, idAcademicYear])

      return { data: { id: rows.insertId } }
    } catch (err) {
      console.log(err)

      return { error: "An error occured while creating a semester" }
    }
  }

  static async update (payload) {
    const {
      idSemester,
      newValSemester
    } = payload

    const query = `
      UPDATE Semestre
      SET valSemestre = (?)
      WHERE idSemestre = (?)
    `

    try {
      const [rows] = await connection.execute(query, [newValSemester, idSemester])
      console.log(rows)
      return { data: payload }
    } catch (err) {
      console.log(err)

      return { error: "An error occured while updating a semester" }
    }
  }
}

export default SemesterModel