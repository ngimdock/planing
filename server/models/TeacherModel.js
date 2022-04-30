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
     * @param {String} matriculeEns 
     * @returns {Object} data | error
     */
    static async getById(matriculeEns) {

      const sql =`
        SELECT * FROM Enseignant WHERE matriculeEns = ?
      `
      try {
        const result = await connection.query(sql, [matriculeEns]).then(([response]) => {
          // console.log({response})

          return [...response]

        })

        return result

      } catch(err) {

        console.log(err)

        return { error : err }
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

      const values = [matriculeEns, nomEns, sexEns]

      const query = `INSERT INTO Enseignant (matriculeEns, nomEns, sexEns) VALUES (?, ?, ?)`
      
      try {
        console.log(value)
        // insert row in the Teacher table
        const [rows] = await connection.execute(query, values)
         
        console.log({ rows })
        return { data }
      } catch (err) {
        console.log(err)

        return { error : err }
      }
    
    }

    /**
     * 
     * @param {Object} data The data recieved from the form
     * @param {String} currentMatriculeEns The Teacher's current matricule
     * @returns data | error
     */
    static async update (data, currentMatriculeEns) {

      const {
        matriculeEns, 
        nomEns, 
        sexEns
      } = data

      const values = [matriculeEns, nomEns, sexEns, currentMatriculeEns]

      const sql1 = `
          UPDATE Enseignant SET matriculeEns = ?, nomEns = ?, sexEns = ? WHERE matriculeEns = ?
        `
      try {

        const queryResult = await connection.query(sql1, values).then(([result]) => {

          return result.affectedRows
          
        }).catch(error => {
          return {error}
        })

        return queryResult

      } catch(err) {
          console.log(err)

          return { error : err }
      }
    }
}

export default TeacherModel