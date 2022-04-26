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

    /**
     * Create a level base on its name
     * @param {string} nomNiv 
     * @returns 
     */
    static async create(nomNiv) {
		const query = `INSERT INTO Niveau (nomNiv) VALUES (?)`

		try {
			// execute query to create the level
			const [rows] = await connection.execute(query, [nomNiv])

            console.log(rows)

			return { data: { id: rows.insertId } }
		} catch(err){
            console.error(err)

			return { error: err }
		}
	}

}

export default NiveauModel 