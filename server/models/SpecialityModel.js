import connection from "../utils/index.js";

class SpecialityModel {
    

    /**
     * 
     */
    static async init () {
      const query = `
        CREATE TABLE IF NOT EXISTS Specialite
        (
          idSpecialite INTEGER PRIMARY KEY auto_increment,
          nomSpecialite VARCHAR(255) NOT NULL
        )
      `

      try {
        await connection.query(query)
  
        console.log("Table Spécialité OK")
      } catch (err) {
        console.log(err)
      }
    }
}

export default SpecialityModel