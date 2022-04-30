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
}



export default Classe_specModel