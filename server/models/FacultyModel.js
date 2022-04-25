import connection from "../utils/index.js"

class FacultyModel {

	static init() {
		console.log(connection)
		const query = `CREATE TABLE IF NOT EXISTS Filiere (idFil INTEGER PRIMARY KEY auto_increment, nomFil VARCHAR(255) NOT NULL)`

		connection.query(query, (error, result, fields) => {
			if(error)
				return error

			return result
		})
	}

	static async create(data) {
		const { nomFil } = data

		const query = "INSERT INTO Filiere (nomFil) VALUE (?)"

		try{
			// create on database
			const results = await connection.execute(query, [nomFil])
			return { data: true }
		}catch(err){
			return { error: err }
		}
	}
}

export default FacultyModel