import connection from "../utils/index.js";

class planifiedModel {

    static init = async () => {

        const query = `
            CREATE TABLE IF NOT EXISTS Programmer
            (
                idAdmin INTEGER NOT NULL,
                codeCours VARCHAR(255) NOT NULL,
                idSalle INTEGER NOT NULL,
                idJour INTEGER NOT NULL,
                heureDebut VARCHAR(255) NOT NULL,
                heureFin VARCHAR(255) NOT NULL,
                CONSTRAINT FK_ProgrammerAdmin FOREIGN KEY(idAdmin) REFERENCES Admin (idAdmin),
                CONSTRAINT FK_ProgrammerCours FOREIGN KEY(codeCours) REFERENCES Cours(codeCours),
                CONSTRAINT FK_ProgrammerSalle FOREIGN KEY(idSalle) REFERENCES Salle(idSalle),
                CONSTRAINT FK_ProgrammerJour FOREIGN KEY(idJour) REFERENCES Jour(idJour),
                CONSTRAINT PK_Programmer PRIMARY KEY (idAdmin, codeCours, idSalle, idJour, heureDebut)
            )
        `

        try{
            await connection.execute(query)
            console.log("Table Programmer OK!");
        }catch(err){
            console.log(err.message)

            return { error: "Some thing happend while creating table Programmer" }
        }

    }

    /**
     * fetch all the programs of the planing on database
     * @returns {object}
     */
    static getPrograms = async () => {

        const query = `SELECT P.codeCours, C.descriptionCours, nomSal, matriculeEns, nomJour, heureDebut, heureFin
                       FROM Programmer P, Cours C,  Salle S, Jour J
                       WHERE (P.idSalle = S.idSalle) AND (P.codeCours = C.codeCours) AND (P.idJour = J.idJour)
                       ORDER BY J.nomJour ASC
                       `
        
        const query2 = `
            SELECT nomEns
            FROM Cours C, Enseignant E
            WHERE C.matriculeEns = E.matriculeEns
        `
                       
        try{
            const [rows] = await connection.execute(query)


            return{ data: rows }
        }catch(err){

            console.log(err.message);
            return { error: "An error occured while geting Programs" }
        }
    }

    static createProgram = async (payload) => {

        const {
            idAdmin,
            codeCours,
            idSalle,
            idJour,
            heureDebut,
            heureFin
        } = payload

        const query = `
            INSERT INTO Programmer(idAdmin, codeCours, idSalle, idJour, heureDebut, heureFin)
            VALUES(?, ?, ?, ?, ?, ?)
        `

        const values = [idAdmin, codeCours, idSalle, idJour, heureDebut, heureFin]

        try{
            const [rows] = await connection.execute(query, values)
            console.log(rows)
            return { data: "Program has created on successfully!!" }
        }catch(err){
            console.log(err.message)

            return{ error: "An error occured while creating the program" }
        }
    }

}

export default planifiedModel