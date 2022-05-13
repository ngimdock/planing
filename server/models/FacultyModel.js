import connection from "../utils/index.js"

class FacultyModel {

	static async init() {
		const query = `
			CREATE TABLE IF NOT EXISTS Filiere 
			(
				idFil INTEGER PRIMARY KEY auto_increment, 
				nomFil VARCHAR(255) NOT NULL
			)
		`

	try {
      await connection.query(query)

      console.log("Table Filiere OK")
    } catch (err) {
      console.log(err)
    }
	}

	static async create(data) {
		const { nomFil } = data

		const query = "INSERT INTO Filiere (nomFil) VALUES (?)"

		try {
			// create on database
			const [rows] = await connection.execute(query, [nomFil])

			return { data: { id: rows.insertId, nomFil } }
		} catch(err){
			return { error: err }
		}
	}

	static async findAll () {
		const query = `
			SELECT *
			FROM Filiere
			ORDER BY nomFil ASC
		`

		try {
			const [rows] = await connection.execute(query)

			return { data: rows }
		} catch (err) {
			console.log(err)
			return { error: "An error occured" }
		}
	}
/*
	 static async update ({ nomFil, idFil }) {
		const query = `
			UPDATE Filiere
			SET nomFil = ?
			WHERE idFil = ?
		`

		try {
			const [rows] = await connection.execute(query, [nomFil, idFil])
			console.log(rows)
			// if (rows.length > 0)
				return { data: { idFil, nomFil } }

			// return 
		} catch (err) {
			console.log(err)

			return { error: "An error occured while updating a faculty" }
		}
	}
	*/
	/**
     * Updating the selected faculty infos in the platform
     * @param {number} idFil The identifier of the given faculty
     * @param {String} nomFil The faculty new name
     * @returns data | error
     */
     static async update(idFil,nomFil) {

		const values = [idFil,nomFil]
  
		const sql1 = `
			UPDATE Filiere SET nomFil = ? WHERE idFil = ?
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
	   * Deleting the faculty having the selected identifier
	   * @param {String} idFil The faculty identifier
	   * @returns {number} The number of deleted speciality
	   */
	   /*
	  static async delete(idFil) {
		const query = `
		  DELETE FROM Filiere WHERE idFil = ?
		`
		try {
		
		  const data = await connection.query(query, [idFil]).then(([result]) => {
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
	*/
  }


export default FacultyModel
