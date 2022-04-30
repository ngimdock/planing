import connection from "../utils/index.js";

class SpecialityModel {
    /**
     * Initialize the table called Specialite inside the DB
     */
    static async init () {
      const query = `
        CREATE TABLE IF NOT EXISTS Specialite
        (
          idSpecialite INTEGER PRIMARY KEY auto_increment,
          nomSpecialite VARCHAR(255) NOT NULL
        )
      `

      try {
        await connection.execute(query)
  
        console.log("Table Spécialité OK")
      } catch (err) {
        console.log(err)
      }
    }

    /**
     * Querying all the specialities of the platform
     * @param {null} 
     * @returns {Object} data | error
     */
     static async get() {

      const query = `
        SELECT * FROM Specialite
      `

      try {
        const data = await connection.execute(query).then(([result]) => {          
          return [...result]
        }).catch(error => {
          return { error }
        })

        return data

      } catch(err) {
        console.log(err)

        return { error: err }
      }
    }

    /**
     * Querying the selected speciality infos
     * @param {String} idSpecialite 
     * @returns {Object} data | error
     */
     static async getById(idSpecialite) {

      const sql =`
        SELECT * FROM Specialite WHERE idSpecialite = ?
      `
      try {
        const result = await connection.query(sql, [idSpecialite]).then(([response]) => {
          
          return [...response]
        }).catch(error => {
          return { error }
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
        nomSpecialite
      } = data

      const value = [nomSpecialite]

      const query = "INSERT INTO Specialite(nomSpecialite) VALUES(?)"

      try {
        console.log(value)
        // inserting a row in the Speciality table
        const [rows] = await connection.query(query, value)

        console.log({ rows })

        return { data }
      } catch(err) {
        console.log(error)

        return { error: err }
      }
    }
}

export default SpecialityModel