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
            
			const [rows] = await connection.execute(query, value)
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
      WHERE C.idNiv =  N.idNiv 
      AND C.idFil = F.idFil
    ` 
  
    try {
      const [rows] = await connection.execute(query)

      // Get specialities
      if (rows.length > 0) {
        const classes = []

        for (let myClass of rows) {
          const { data, error } = await this.getSpecialities(myClass.codeClasse)
          let specialities

          if (error) specialities = []
          else specialities = data

          classes.push({
            ...myClass,
            specialities,
            groups: []
          })
        }

        // Get groups
        for (let classIndex in classes) {
          const { data, error } = await this.getGroups(classes[classIndex].codeClasse)

          if (data) {
            classes[classIndex].groups = data
          }
        }

        return { data: classes }
      }

      return { data: rows }
    } catch (err) {
      console.error(err)

      return { error: "An error occured while getting all Classes" }
    }
  }

  static async getSpecialities (idClass) {
    const query = `
      SELECT idSpecialite, nomSpecialite, C.capacite
      FROM Classe_spec C, Specialite S
      WHERE C.codeClass = ?
      AND C.idSpec = S.idSpecialite
    `

    try {
      const [rows] = await connection.execute(query, [idClass])

      const specialities = []

      for (let spec of rows) {
        const { data } = await this.getSpecialityGroups(spec.idSpecialite)

        if (data) specialities.push({ ...spec, groups: data })
      }

      return { data: specialities }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async getGroups (idClass) {
    const query = `
      SELECT G.nomGroupe, G.idGroupe, G.capaciteGroupe, G.idSpecialite
      FROM Groupe G, Classe C
      WHERE G.codeClasse = ?
      AND G.codeClasse = C.codeClasse
    `

    try {
      const [rows] = await connection.execute(query, [idClass])
      
      return { data: rows }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async getSpecialityGroups (idSpeciality) {
    const query = `
      SELECT G.nomGroupe, G.idGroupe, G.capaciteGroupe, G.idSpecialite
      FROM Groupe G, Specialite S
      WHERE G.idSpecialite = ?
      AND G.idSpecialite = S.idSpecialite
    `

    try {
      const [rows] = await connection.execute(query, [idSpeciality])

      return { data: rows }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
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
      idNiv
      } = data

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
