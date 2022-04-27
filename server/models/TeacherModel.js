import connection from "../utils/index.js";

class TeacherModel {
    

    /**
     * 
     */
    static async init () {
      const query = `
        CREATE TABLE IF NOT EXISTS Enseignant
        (
          matriculeEns VARCHAR(255) NOT NULL PRIMARY KEY,
          nomEns VARCHAR(255) NOT NULL,
          sexEns VARCHAR(255) NOT NULL
        )
      `

      try {
        await connection.query(query)
  
        console.log("Table Enseignant OK")
      } catch (err) {
        console.log(err)
      }
    }
}

export default TeacherModel