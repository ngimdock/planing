import connection from "../utils/index.js";

class GroupModel {
    

    /**
     * 
     */
    static async init () {

      const query = `
        CREATE TABLE IF NOT EXISTS Groupe
        (
          idGroupe INTEGER PRIMARY KEY auto_increment,
          nomGroupe VARCHAR(255) NOT NULL,
          capaciteGroupe INTEGER NOT NULL,
          codeClasse VARCHAR(255) NOT NULL,
          idSpecialite INTEGER NOT NULL,
          CONSTRAINT FK_ClasseGroupe 
          FOREIGN KEY(codeClasse) REFERENCES Classe (codeClasse),
          CONSTRAINT FK_SpecialiteGroupe
          FOREIGN KEY(idSpecialite) REFERENCES Specialite (idSpecialite)
          ON DELETE CASCADE
          ON UPDATE CASCADE
        )
      `

      try {
        await connection.execute(query)
  
        console.log("Table Groupe OK")
      } catch (err) {
        console.log(err)
      }
    }

    /**
     * 
     * @param {null} null no parameters necessary
     * @returns 
     */
    static async get() {
      const sql = `
        SELECT * FROM Groupe
      `

      try {

        const response = await connection.execute(sql).then(([result]) => {
          return [...result]
        }).catch(error => {
          console.log(error)

          return error
        })

        return response
      } catch(err) {
        console.log(err) 

        return { error : err }
      }
    }

    /**
     * Creating a row in the Group table 
     * @param {Object} data The group infos for creation
     * @return {Object} data | error
     */
    static async create(data) {

      const {
        nomGroupe,
        capaciteGroupe,
        codeClasse,
        idSpecialite
      } = data

      const sql = `
        INSERT INTO Groupe (nomGroupe, capaciteGroupe, codeClasse, idSpecialite) VALUES (?, ?, ?, ?)
      `

      try {
        const response = await connection.execute(sql, [nomGroupe, capaciteGroupe, codeClasse, idSpecialite]).then(([result]) => {
          return result.affectedRows
        }).catch(error => {
          return error
        })

        return response
      } catch(err) {
        console.log(err)

        return { error : err }
      }
    }
}

export default GroupModel