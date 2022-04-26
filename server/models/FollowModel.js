import connection from "../utils/index.js";

class FollowModel {
    
    /**
     * 
     */
    static async init () {

        // TODO add corresponding foreign keys 

        const query = `
          CREATE TABLE IF NOT EXISTS Suivre
          (

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