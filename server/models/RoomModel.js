import connection from "../utils/index.js";

class RoomModel {

	static init = async () => {
		const query = `
			CREATE TABLE IF NOT EXISTS Room 
			(
					idSalle INTEGER PRIMARY KEY NOT NULL auto_increment,
					nomSal VARCHAR(255) NOT NULL,
					capaciteSal INTEGER NOT NULL
			)
		`

		try{
			const result = await connection.execute(query)
			
			console.log("Table Salle OK")
		}catch(err){
			console.log(err)
		}
	}

	static create = async (payload) => {

		const query = `
							INSERT INTO Room (nomSal, capaciteSal)
							VALUE (?, ?)
						`
		try{
			const [rows] = await connection.execute(query, [payload.nomSal, payload.capacite])

			return{ data: {...rows} }
		}catch(err){
			console.log(err)

			return { error: "An error occured when creating the room" }
		}
	}

}

export default RoomModel