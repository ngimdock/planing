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
}

export default FacultyModel
