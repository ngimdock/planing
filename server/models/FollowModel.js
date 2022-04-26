import connection from "../utils/index.js";

class FollowModel {
    
    /**
     * 
     */
    static async init () {

        // NOTE - correct request but cannot be implemented yet

        const query = `
          CREATE TABLE IF NOT EXISTS Suivre
          (
              idGroupe INTEGER PRIMARY KEY NOT NULL,
              codeCours INTEGER PRIMARY KEY NOT NULL,
              CONSTRAINT FK_GroupeSuivre
              FOREIGN KEY(idGroupe) REFERENCES Groupe (idGroupe),
              CONSTRAINT FK_CoursSuivre
              FOREIGN KEY(codeCours) REFERENCES Cours (codeCours)
              ON DELETE CASCADE
              ON UPDATE CASCADE
          )
        `

        try {
            await connection.query(query)

            console.log("Table Suivre OK")
        } catch(err) {
            console.log(err)
        }
    }

}

export default FollowModel