import connection from "../utils/index.js";

class FollowModel {
    
    /**
     * Initilisation of the Suivre Table in the DB
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
     * Querying the groups following thesame course
     * @param {String} codeCourse The reference to the desired courses 
     * @returns response | error
     */
    static async getByCourse(codeCourse) {
        const sql = `
         SELECT idGroupe FROM Suivre WHERE codeCours = ?
        `

        try {
            const response = await connection.execute(sql, [codeCourse]).then(([result]) => {
                return [...result]
            }).catch(error => {
                console.log(error)
                return { error }
            })

            return response
        } catch(err) {
            console.log(err)

            return { error : err }
        }
    }

    /**
     * Querying the courses followed by thesame groups
     * @param {number} idGroupe The reference to the desired courses 
     * @returns response | error
     */
     static async getByGroup(idGroupe) {
        const sql = `
         SELECT codeCours FROM Suivre WHERE idGroupe = ?
        `

        try {
            const response = await connection.execute(sql, [idGroupe]).then(([result]) => {
                return [...result]
            }).catch(error => {
                console.log(error)
                return { error }
            })

            return response
        } catch(err) {
            console.log(err)

            return { error : err }
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
            
            return { response, data }
        } catch(err) {
            console.log(err)

            return { error: err }
        }
    }

    /**
     * Updating the followal between a group and a course using their references
     * @param {Object} currentData the current references of the follow row
     * @param {Object} newData the new references of the follow row
     * @return response of the request
     */
    static async update(currentData, newData) {

        const {
            currentIdGroupe,
            currentCodeCours
        } = currentData

        const {
            idGroupe,
            codeCours
        } = newData

        const sql = `
            UPDATE Suivre SET idGroupe = ?, codeCours = ? WHERE idGroupe = ? AND codeCours = ?
        `

        const values = [idGroupe, codeCours, currentIdGroupe, currentCodeCours]

        try {
            const response = await connection.query(sql, values).then(([result]) => {
                return result.affectedRows
            }).catch(error => {
                console.log(error)

                return { error }
            })

            return { response, newData }
        } catch (err) {
            console.log(err)

            return { error : err }
        }
    }

    /**
     * Deleting a groupe-course followance in the BD from their references
     * @param {Object} data The necessesary references for deletion
     * @returns {Object} data | error
     */
     static async delete(data) {

        const {
            idGroupe,
            codeCours
        } = data

        const query = `
          DELETE FROM Suivre WHERE idGroupe = ? AND codeCours = ?
        `

        try {
        
          const response = await connection.query(query, [idGroupe, codeCours]).then(([result]) => {
            return result.affectedRows
          }).catch(error => {
            console.log(error)
          })
  
          return {response, data}
        } catch (err) {
          console.log(err)
  
          return { error : err }
        }
      }
}

export default FollowModel