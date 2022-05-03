import connection from "../utils/index.js";

class planifiedModel {

    static init = async () => {

        const query = `
            CREATE TABLE IF NOT EXISTS Programmer
            (
                heureDebut VARCHAR(255) NOT NULL,
                heureFin VARCHAR(255) NOT NULL,
                idAdmin INTEGER NOT NULL,
                codeCours VARCHAR(255) NOT NULL,
                idSalle INTEGER NOT NULL,
                idJour INTEGER NOT NULL,
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

    static getPrograms = async () => {
        console.log("hello boy");
    }

}

export default planifiedModel