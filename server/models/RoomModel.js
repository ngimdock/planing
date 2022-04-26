import connection from "../utils/index.js";

class RoomModel {

	static init = () => {
		const query = `
							CREATE TABLE IF NOT EXISTS Room 
							(
									idSalle INTEGER PRIMARY KEY NOT NULL auto_increment,
									nomSal VARCHAR(255) NOT NULL,
									capaciteSal INTEGER NOT NULL
							)
						`
		try{
			const result = connection.execute(query)
			console.log(result);

			console.log("Table classe OK")
		}catch(err){
			console.log(err)
		}
	}

}

export default RoomModel