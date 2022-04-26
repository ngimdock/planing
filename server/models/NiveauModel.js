import connection from "../utils/index.js"

class NiveauModel {

    static async init(){

        const query = `
            CREATE TABLE IF NOT EXISTS Niveau
            (
                idNiv INTEGER PRIMARY KEY auto_increment, 
                nomNiv VARCHAR(255) NOT NULL
            ) `
        try {
            connection.query(query)
            console.log("Table Niveau OK")
        } catch (error) {
            console.log(error)
        }

    }

    static async create(data) {
		const { nomNiv } = data

		const query = "INSERT INTO Niveau (nomNiv) VALUE (?)"

		try {
			// insert row in table
			const [rows] = await connection.execute(query, [nomNiv])

			console.log({ rows })
			return { data: true }
		} catch(err){
			return { error: err }
		}
	}

}

export default NiveauModel 