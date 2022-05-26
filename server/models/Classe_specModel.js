import connection from "../utils/index.js"

class Classe_specModel{
    static async init(){
        const query = `
        CREATE TABLE IF NOT EXISTS Classe_spec
        (
            codeClasse VARCHAR(255), 
            idSpecialite INTEGER,
            capacite INTEGER NOT NULL,
            CONSTRAINT PK_avoir
            PRIMARY KEY(codeClasse, idSpecialite),
            CONSTRAINT FK_Class
            FOREIGN KEY(codeClasse) REFERENCES Classe (codeClasse)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
            CONSTRAINT FK_Speciality
            FOREIGN KEY(idSpecialite) REFERENCES Specialite (idSpecialite)
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

    static async findOne (codeClasse, idSpec) {
      
        const query = `
          SELECT * 
          FROM Classe_spec
          WHERE codeClass = ? AND idSpec = ? 
        ` 
        try {
          const [rows] = await connection.execute(query, [codeClasse, idSpec])
    
          console.log("rows", rows)
          return {data : rows}
        } catch (err) {
          console.error(err)
    
          return { error: "An error occured while getting  Class" }
        }
    }

    //rechercher toutes les specialites d'une classe
    static async findAllSpec (codeClasse) {
      
        const query = `
          SELECT * 
          FROM Classe_spec
          WHERE codeClass = ? 
        ` 
        try {
          const [rows] = await connection.execute(query, [codeClasse])
    
          console.log(rows)
          return {data : rows}
        } catch (err) {
          console.error(err)
    
          return { error: "An error occured while getting  Classe_spec" }
        }
    }
    
    static async create(data) {
        const { 
            codeClasse,
            idSpec,
            capacity
        } = data
            
        const value = [codeClasse, idSpec, capacity]
  
        const query = "INSERT INTO Classe_spec (codeClasse, idSpecialite, capacite) VALUES (?, ?, ?)"
  
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
        const {
          idSpec,
          capacity
        } = data

        const query = "UPDATE Classe_spec SET idSpec = ?, capacite = ? WHERE codeClass = ? "
    
        try {
          console.log([ idSpec, capacity, codeClasse])
          const [rows] = await connection.execute(query, [ idSpec, capacity, codeClasse])
          console.log(rows)
          return {data : rows}
        } catch (error) {
            console.log(error)
            return {error: error}
        }   
    }
    static async delete ( codeClasse, idSpec ){
        console.log("les data de ddelete", codeClasse, idSpec)
        const query = "DELETE FROM Classe_spec WHERE codeClass = ? AND idSpec = ?"
        try {
            const [rows] = await connection.execute(query, [codeClasse, idSpec])
            return {data : `sucessfully delete classe_spec ${codeClasse} and ${idSpec}` }
        } catch (error) {
            console.log(error)
            return {error: error}
        }   
      }
    
}



export default Classe_specModel