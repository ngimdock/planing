import connection from '../utils/index.js';

class ClassModel {

    static async init(){
        const query =`
            CREATE TABLE IF NOT EXISTS Classe
            (
                codeClasse VARCHAR(255) PRIMARY KEY, 
                nomClasse VARCHAR(255) NOT NULL,
                capaciteClasse INTEGER NOT NULL,
                idFil INTEGER NOT NULL,
                idNiv INTEGER NOT NULL,
                CONSTRAINT FK_Class_niv
                FOREIGN KEY(idNiv) REFERENCES Niveau (idNiv),
                CONSTRAINT FK_Class_fil
                FOREIGN KEY(idFil) REFERENCES Filiere (idFil)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            ) 
        `
        try {
            connection.query(query)
            console.log("Table Classe OK")
        } catch (error) {
            console.log(error)
        }
    }

    static async create(data) {
		const { 
            codeClasse,
            nomClasse,
            capaciteClasse,
            idFil,
            idNiv
        } = data
        
        const value = [codeClasse, nomClasse, capaciteClasse, idFil, idNiv]

		const query = "INSERT INTO Classe (codeClasse, nomClasse, capaciteClasse, idFil, idNiv) VALUE (?)"

		try {
			// insert row in Classe table 
			const [rows] = await connection.execute(query, [value])

			console.log({ rows })
			return { data: true }
		} catch(err){
			return { error: err }
		}
	}
}


export default ClassModel;



