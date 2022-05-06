import connection from '../utils/index.js';

class ClassModel {

    static async init(){
        const query = `
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
            await connection.execute(query)
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
        console.log(value)
		const query = `
      INSERT INTO Classe
      (codeClasse, 
        nomClasse, 
        capaciteClasse, 
        idFil, 
        idNiv
      ) VALUES (?,?,?,?,?)
    `

		try {
            console.log(value)
			// insert row in Classe table 
            
			const [rows] = await connection.execute(query, [codeClasse, nomClasse, capaciteClasse, idFil, idNiv])
			console.log("rows",{ rows })
			return { data: {...data } }
		} catch(err){
            console.error(err)

			return { error: err }
		}
	}


  static async findAll () {

    const query = `
      SELECT * 
      FROM Classe C, Niveau N, Filiere F
      WHERE C.idNiv =  N.idNiv AND C.idFil = F.idFil 
    ` 
    try {
      const [rows] = await connection.execute(query)

      console.log(rows)
      return {data : rows}
    } catch (err) {
      console.error(err)

      return { error: "An error occured while getting all Classes" }
    }
  }

  static async findOne (codeClasse) {
      
    const query = `
      SELECT * 
      FROM Classe C, Niveau N, Filiere F
      WHERE C.codeClasse = ? AND C.idNiv =  N.idNiv AND C.idFil = F.idFil 
    ` 
    try {
      const [rows] = await connection.execute(query, [codeClasse])

      console.log(rows)
      return {data : rows}
    } catch (err) {
      console.error(err)

      return { error: "An error occured while getting  Class" }
    }
  }

  static async update ( codeClasse, data ){
    const query = "UPDATE Classe SET nomClasse = ?, capaciteClasse = ?, idFil = ?, idNiv = ?  WHERE codeClasse=? "
    const {
        nomClasse, 
        capaciteClasse, 
        idFil, 
        idNiv } = data

    try {
        const [rows] = await connection.execute(query, [nomClasse, capaciteClasse, idFil, idNiv, codeClasse])
        return {data : rows}
    } catch (error) {
        console.log(error)
        return {error: error}
    }   
  }

  static async delete ( codeClasse ){
    const query = "DELETE FROM Classe WHERE codeClasse=?"
    try {
        const [rows] = await connection.execute(query, [codeClasse])
        return {data : `sucessfully delete level ${codeClasse}` }
    } catch (error) {
        console.log(error)
        return {error: error}
    }   
}

}


export default ClassModel;
