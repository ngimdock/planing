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
     * Querying all the teachers of the platform
     * @param {null} null no parameters necessary
     * @returns {Object} data | error
     */
    static async get() {
      const query = `
        SELECT * FROM Enseignant
      `

      try {
        const data = await connection.execute(query).then(([result]) => {          
          return { data: [...result] }
        }).catch(error => {
          console.log(error)
          return { error }
        })

        return data
      } catch(err) {
        console.log(err)

        return { error: err }
      }
    }

    /**
     * Querying the selected teacher infos
     * @param {String} matriculeEns 
     * @returns {Object} data | error
     */
    static async getById(matriculeEns) {

      const sql =`
        SELECT * FROM Enseignant WHERE matriculeEns = ?
      `
      try {
        const result = await connection.query(sql, [matriculeEns]).then(([response]) => {
          return [...response]
        }).catch(error => {
          console.log(error)
          return { error }
        })

        return result

      } catch(err) {

        console.log(err)

        return { error : err }
      }
    }

    /**
     * Creating a new teacher row in the platform
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
        const [rows] = await connection.execute(query, values)
        
        return { data }
      } catch (err) {
        console.log(err)

        return { error : err }
      }
    
    }

    /**
     * Updating the selected teacher infos in the platform
     * @param {Object} data The data recieved from the form
     * @param {String} currentMatriculeEns The Teacher's current matricule
     * @returns data | error
     */
    static async update(data, currentMatriculeEns) {

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

        const response = await connection.query(sql1, values).then(([result]) => {
          return result.affectedRows
        }).catch(error => {
          console.log(error)
          return {error}
        })

        return response

      } catch(err) {
          console.log(err)

          return { error : err }
      }
    }

    /**
     * Deleting the teachers having the selected identifier
     * @param {String} matriculeEns The teacher's identifier
     * @returns {number} The number of deleted teachers
     */
    static async delete(matriculeEns) {
      const query = `
        DELETE FROM Enseignant WHERE matriculeEns = ?
      `
      try {
      
        const data = await connection.query(query, [matriculeEns]).then(([result]) => {
          return result.affectedRows
        }).catch(error => {
          console.log(error)
        })

        return data
      } catch (err) {
        console.log(err)

        return { error : err }
      }
    }

    static async checkMatricule(matricule) {
      const query = `
        SELECT *
        FROM Enseignant
        WHERE matriculeEns = ?
      `

      try {
        const [rows] = await connection.execute(query, [matricule])

        if (rows.length > 0) {
          return { data: true }
        }

        return { data: false }
      } catch (err) {
        console.log(err)

        return { error: "An error occured" }
      }
    }
}

export default TeacherModel