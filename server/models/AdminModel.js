import connection from "../utils/index.js";

class AdminModel {
  static init () {
    const query = `
      CREATE TABLE IF NOT EXISTS Admin 
      (
        idAdmin INTEGER PRIMARY KEY auto_increment, 
        nomAdmin VARCHAR(255) NOT NULL,
        passwordAdmin VARCHAR(255) NOT NULL,
        emailAdmin VARCHAR(255) NOT NULL,
        numTelephone INTEGER NOT NULL
      )`

		connection.query(query, (error, result, fields) => {
			if(error) {
				console.error(error)
				
				return 
			}

			console.log(query)
			console.log("Table Admin cree")
		})
  }
}

export default AdminModel