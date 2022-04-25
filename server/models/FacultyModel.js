import connection from "../utils/index.js"

class FacultyModel {

	static init() {
		const query = `
			CREATE TABLE IF NOT EXISTS Filiere 
			(
				idFil INTEGER PRIMARY KEY auto_increment, 
				nomFil VARCHAR(255) NOT NULL
			)
		`

		connection.query(query, (error, result, fields) => {
			if(error) {
				console.error(error)
				
				return 
			}

			console.log(query)
			console.log("Table Filiere cree")
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