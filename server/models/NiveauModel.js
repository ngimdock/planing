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

    static async findAll (){

        const query = "SELECT * FROM Niveau"

        try {
            const [rows] = await connection.execute(query)
            return {data : rows}
        } catch (error) {
            console.log(error)
            return {error: error}
        }
         
    }

    static async findOne(id){

        const query = "SELECT * FROM Niveau WHERE idNiv=?"

        try {
            const [rows] = await connection.execute(query,[id])
            return {data : rows}
        } catch (error) {
            console.log(error)
            return {error: error}
        }
         
    }

    static async update (id, data ){
        const query = "UPDATE Niveau SET nomNiv=? WHERE idNiv=? "
        const { nomNiv } = data

        try {
            const [rows] = await connection.execute(query, [nomNiv, id])
            return {data : rows}
        } catch (error) {
            console.log(error)
            return {error: error}
        }   
    }

    static async delete (id){
        const query = "DELETE FROM Niveau WHERE idNiv=?"
        try {
            const [rows] = await connection.execute(query, [id])
            return {data : `sucessfully delete level ${id}` }
        } catch (error) {
            console.log(error)
            return {error: error}
        }   
    }

}

export default NiveauModel 