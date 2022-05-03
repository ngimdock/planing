import connection from "../utils/index.js"

class Classe_specModel{
    static async init(){
        const query = `
        CREATE TABLE IF NOT EXISTS Classe_spec
        (
            codeClass VARCHAR(255), 
            idSpec INTEGER,
            capacite INTEGER NOT NULL,
            CONSTRAINT PK_avoir
            PRIMARY KEY(codeClass, idSpec),
            CONSTRAINT FK_Class
            FOREIGN KEY(codeClass) REFERENCES Classe (codeClasse)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
            CONSTRAINT FK_Speciality
            FOREIGN KEY(idSpec) REFERENCES Specialite (idSpecialite)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ) 
        `
        try {
            await connection.execute(query)
            // await connection.execute(query1)
            console.log("Table Classe_spec OK")
        } catch (error) {
            console.log(error)
        }
    }
    static async create(data) {
        const { 
            codeClasse,
            idSpec,
            capacity
        } = data
            
        const value = [codeClasse, idSpec, capacity]
  
        const query = "INSERT INTO Classe_spec (codeClass, idSpec, capacite) VALUES (?, ?, ?)"
  
        try {
                console.log(value)
          // insert row in Classe table 
          const [rows] = await connection.execute(query, value)
  
          console.log({ rows })
          return { data }
        } catch(err){
                console.error(err)
  
          return { error: err }
        }
    }
    static async update ( codeClasse, data ){
        const query = "UPDATE Classe_spec SET idSpec = ?, capacite = ? WHERE codeClass = ? "
        const {
          idSpec,
          capacity
        } = data
    
        try {
            const [rows] = await connection.execute(query, [ idSpec, capacity, codeClasse])
            return {data : rows}
        } catch (error) {
            console.log(error)
            return {error: error}
        }   
      }
}



export default Classe_specModel