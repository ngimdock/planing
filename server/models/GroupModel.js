import connection from "../utils/index.js";

class GroupModel {
    

    /**
     * 
     */
    static async init () {

    // TODO : Add the corresponding foreign keys to the query

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
        await connection.query(query)
  
        console.log("Table Groupe OK")
      } catch (err) {
        console.log(err)
      }
    }
}

export default GroupModel