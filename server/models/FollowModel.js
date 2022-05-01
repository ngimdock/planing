import connection from "../utils/index.js";

class FollowModel {
    
    /**
     * 
     */
    static async init () {
        const query = `
          CREATE TABLE IF NOT EXISTS Suivre
          (
              idGroupe INTEGER NOT NULL,
              codeCours VARCHAR(10) NOT NULL,
              PRIMARY KEY (idGroupe, codeCours),
              CONSTRAINT FK_SuivreGroupe
              FOREIGN KEY(idGroupe) REFERENCES Groupe (idGroupe),
              CONSTRAINT FK_SuivreCours
              FOREIGN KEY(codeCours) REFERENCES Cours (codeCours)
              ON DELETE CASCADE
              ON UPDATE CASCADE
          )
        `

        try {
            await connection.execute(query)

            console.log("Table Suivre OK")
        } catch(err) {
            console.log(err)
        }
    }

}

export default FollowModel