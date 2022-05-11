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
     * 
     * @param {Object} data The data recieved from the form
     * @returns {Object} data | error
     */
    static async create(data) {
      const {
        nomSpecialite
      } = data

      const query = "INSERT INTO Specialite(nomSpecialite) VALUES(?)"

      try {
        const [rows] = await connection.execute(query, [nomSpecialite])

        return { data: { id: rows.insertId, ...data } }
      } catch(err) {
        console.log(error)

        return { error: err }
      }
    }

    /**
     * Updating the selected specialtty infos in the platform
     * @param {number} idSpecialite The identifier of the given speciality
     * @param {String} nomSpecialite The specialty new name
     * @returns data | error
     */
     static async update(idSpecialite, nomSpecialite) {

      const values = [nomSpecialite, idSpecialite]

      const sql1 = `
          UPDATE Specialite SET nomSpecialite = ? WHERE idSpecialite = ?
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

    /**
     * Deleting the speciality having the selected identifier
     * @param {String} idSpecialite The speciality identifier
     * @returns {number} The number of deleted speciality
     */
     static async delete(idSpecialite) {
      const query = `
        DELETE FROM Specialite WHERE idSpecialite = ?
      `
      try {
      
        const data = await connection.query(query, [idSpecialite]).then(([result]) => {
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
}

export default SpecialityModel