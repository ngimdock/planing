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

	static getRooms = async () => {

		const query = `
								SELECT *
								FROM Room
								WHERE 1
							`
		try{
			const [rows] = await connection.execute(query)
			return { data: rows }
		}catch(err){
			console.log(err)

			return { error: "An error occured when geting rooms" }
		}
	}

	static getRoom = async (payload) => {

		const query = `
								SELECT *
								FROM Room
								WHERE idSalle = (?)
							`
		try{
			const [rows] = await connection.execute(query, [payload])
			return { data: rows }
		}catch(err){
			console.log(err)

			return { error: "An error occured when geting the room" }
		}
	}

	static create = async (payload) => {

		const query = `
							INSERT INTO Room (nomSal, capaciteSal)
							VALUE (?, ?)
						`
		try{
			const [rows] = await connection.execute(query, [payload.nomSal, payload.capaciteSal])

			return{ data: {...rows} }
		}catch(err){
			console.log(err)

			return { error: "An error occured when creating the room" }
		}
	}

	static update = async (payload) => {

		const query = `
							UPDATE Room
							SET nomSal = (?), capaciteSal = (?)
							WHERE idSalle = (?)
						`
		try{
			const result = await connection.execute(query, [payload.nomSal, payload.capaciteSal, payload.id])
			return { data: result }
		}catch(err){
			console.log(err)
			return { error: "An error occured when updating the room" }
		}
	}

	static delete = async (payload) => {

		const query = `
							DELETE
							FROM Room
							WHERE idSalle = (?)
						`
		try {
			const [rows] = await connection.execute(query, [payload])
			return { data: {...rows} }
		}catch(err){
			console.log(err);
			return{ error: "An error occured when creating the room" }
		}
	}

}

export default RoomModel