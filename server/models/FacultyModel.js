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

		const query = "INSERT INTO Filiere (nomFil) VALUE (?)"

		try {
			// create on database
			const [rows] = await connection.execute(query, [nomFil])

			console.log({ rows })
			return { data: true }
		} catch(err){
			return { error: err }
		}
	}
}

export default FacultyModel