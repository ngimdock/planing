import connection from "../utils/index.js";

class DayModel{
    static init = async () => {
		const query = `
			CREATE TABLE IF NOT EXISTS Jour 
			(
				idSalle INTEGER PRIMARY KEY NOT NULL auto_increment,
				nomJour VARCHAR(255) NOT NULL
			)
		`
		try{
			//create table
			await connection.execute(query)

			// check if day table alrady get data
			const { data, error } = await this.getDays()

			// insert data on day table
			if(data?.length === 0) await this.create()

			console.log("Table jour OK")
		}catch(err){
			console.log(err)
		}
	}

	static getDays = async () => {

		const query = `
			SELECT *
			FROM Jour
		`

		try{
			const [rows] = await connection.execute(query)

			console.log("Adding Days inside the Jours table OK")
			return { data: rows }
		}catch(err){
			console.log(err)

			return { error: "An error occured when geting the day" }
		}
	}

    static create = async () => {

		const query = `
			INSERT INTO Jour (nomJour)
			VALUES ('Lundi'),
						('Mardi'),
						('Mercredi'),
						('Jeudi'),
						('Vendredi'),
						('Samedi'),
						('Dimanche')
		`

		try {

      const [rows] = await connection.execute(query)

			return{ data: {...rows} }
		}catch(err){
			console.log(err)

			return { error: "An error occured when insert data on table Day" }
		}
	}
}

export default DayModel