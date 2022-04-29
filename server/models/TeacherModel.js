import connection from "../utils/index.js";

class TeacherModel {
    /**
     * Initialize the Table called Enseignant inside the DB
     */
    static async init () {
      const query = `
        CREATE TABLE IF NOT EXISTS Enseignant
        (
          matriculeEns VARCHAR(10) NOT NULL PRIMARY KEY,
          nomEns VARCHAR(255) NOT NULL,
          sexEns VARCHAR(20) NOT NULL
        )
      `

      try {
        await connection.execute(query)
  
        console.log("Table Enseignant OK")
      } catch (err) {
        console.log(err)
      }
    }

    /**
     * 
     * @param {Object} data The data recieved from the form
     * @returns {Object} data | error
     */
    static async create(data) {
      const {
        matriculeEns,
        nomEns,
        sexEns
      } = data

      const value = [matriculeEns, nomEns, sexEns]

      const query = "INSERT INTO Enseignant (matriculeEns, nomEns, sexEns) VALUES (?, ?, ?)"
      
      try {
        console.log(value)
        // insert row in the Teacher table
        const [rows] = await connection.execute(query, value)
         
        console.log({ rows })
        return { data }
      } catch (err) {
        console.log(err)

        return { error : err }
      }
    
    }
}

export default TeacherModel