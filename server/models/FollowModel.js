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

    /**
     * Creating a new association bewteen a group and a course
     * @param {Object} data The association new infos
     * @returns {Object} data | error
     */
    static async create(data) {
        const { 
            idGroupe,
            codeCours
        } = data

        const sql = `
            INSERT INTO Suivre (idGroupe, codeCours) VALUES (?, ?)
        `
        try {
            const response = await connection.query(sql, [idGroupe, codeCours]).then(([result]) => {
                return result.affectedRows
            }).catch(error => {
                console.log(error)
                return error
            })
            
            console.log(response)

            return { data }

        } catch(err) {
            console.log(err)

            return { error: err }
        }
    }

}

export default FollowModel