import connection from "../utils/index.js";

class planifiedModel {

    static init = async () => {

        const query = `
            CREATE TABLE IF NOT EXISTS Programmer
            (
                idAdmin INTEGER,
                codeCours VARCHAR(10),
                idSalle INTEGER,
                idJour INTEGER,
                heureDebut TIME,
                heureFin TIME NOT NULL,
                CONSTRAINT PK_Programmer 
                PRIMARY KEY(idAdmin, codeCours, idSalle, idJour, heureDebut),
                CONSTRAINT FK_ProgrammerAdmin 
                FOREIGN KEY(idAdmin) REFERENCES Admin(idAdmin)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                CONSTRAINT FK_ProgrammerCours 
                FOREIGN KEY(codeCours) REFERENCES Cours(codeCours)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                CONSTRAINT FK_ProgrammerSalle 
                FOREIGN KEY(idSalle) REFERENCES Salle(idSalle)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                CONSTRAINT FK_ProgrammerJour 
                FOREIGN KEY(idJour) REFERENCES Jour(idJour)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )
        `

        try{
            await connection.execute(query)
            console.log("Table Programmer OK!");
        }catch(err){
            console.log(err)

            return { error: "Some thing happend while creating table Programmer" }
        }

    }

    /**
     * fetch all the programs of the planing on database
     * @returns {object}
     */
    static getAllPrograms = async (payload) => {

        const { idAnneeAca, idSemestre } = payload

        const query = `
            SELECT DISTINCT P.codeCours, C.descriptionCours, nomSal, E.nomEns, nomJour, heureDebut, heureFin, Cla.codeClasse, F.nomFil, G.nomGroupe
            FROM Programmer P, Cours C,  Salle S, Jour J, Enseignant E, AnneeAcademique A, Semestre Se, Suivre Sui, Groupe G, Classe Cla, Filiere F
            WHERE (C.idSemestre = (?))
            AND (Se.idAnneeAca = (?))
            AND (C.idSemestre = Se.idSemestre)
            AND (E.matriculeEns = C.matriculeEns)
            AND (P.idSalle = S.idSalle) 
            AND (P.codeCours = C.codeCours) 
            AND (P.idJour = J.idJour) 
            AND (C.codeCours = Sui.codeCours)
            AND (Sui.idGroupe = G.idGroupe)
            AND (Cla.CodeClasse = G.codeClasse)
            AND (Cla.idFil = F.idFil)
            ORDER BY J.nomJour ASC
        `
                  
        try{
            const [rows] = await connection.execute(query, [idSemestre, idAnneeAca])

            // Format data section

            // Initial data
            const programsByFaculties = []

            // Some handlers

            /**
             * Get the position of the program that match the faculty arg
             * @param {string} faculty 
             */
            const getFacultyAndClassIndex = (faculty, classCode) => {
                // Get index of faculty
                const facIndex = programsByFaculties.findIndex(prog => prog.facultyName === faculty)

                if (facIndex > -1) {
                    // Get index of class
                    const classIndex = programsByFaculties[facIndex].classes.findIndex(myClass => myClass.code === classCode)
                
                    if (classIndex > -1) return { facIndex, classIndex }

                    return { facIndex }
                }

                return {}
            }

            // Loop through the rows and organize the program
            for (let prog of rows) {
                // Initial data of program
                const program = {
                    subjectCode: prog.codeCours,
                    subjectDescription: prog.descriptionCours,
                    roomName: prog.nomSal,
                    teacherName: prog.nomEns,
                    day: prog.nomJour,
                    group: prog.nomGroupe,
                    startHour: prog.heureDebut,
                    endHour: prog.heureFin
                }

                // Get indexes of faculty and class
                const { facIndex, classIndex } = getFacultyAndClassIndex(prog.nomFil, prog.codeClasse)

                // If these tow indexes exist
                if (facIndex !== undefined && classIndex !== undefined) {
                    // Put facProgram inside the list of faculties programs
                    programsByFaculties[facIndex].classes[classIndex].programs[program.day].push(program)
                } else {
                    // Initial data for class program
                    const myClass = {
                        code: prog.codeClasse,
                        programs: {
                            "Lundi": [],
                            "Mardi": [],
                            "Mercredi": [],
                            "Jeudi": [],
                            "Vendredi": [],
                            "Samedi": [],
                            "Dimanche": []
                        }
                    }

                    // Put program inside class program
                    myClass.programs[program.day].push(program)

                    if (facIndex !== undefined) {
                        programsByFaculties[facIndex].classes.push(myClass)
                    } else {
                        // Initial data of faculty program
                        const facProgram = {
                            facultyName: prog.nomFil,
                            classes: [myClass]
                        }
    
                        // Put facProgram inside the list of faculties programs
                        programsByFaculties.push(facProgram)
                    }
                }
            }

            return{ data: programsByFaculties }
        }catch(err){

            console.log(err.message);
            return { error: "An error occured while geting Programs" }
        }
    }

    /**
     * Create Program from database
     * @param {Object} payload 
     * @returns {Object}
     */
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
            VALUES (?, ?, ?, ?, ?, ?)
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

    /**
     * Delete a program from database
     * @param {String} payload id for Program
     * @returns {Object} 
     */
    static deleteProgram = async (payload) => {

        const { 
            idAdmin, 
            codeCours, 
            idSalle, 
            idJour, 
            heureDebut
        } = payload

        
        const query = `
            DELETE
            FROM Programmer
            WHERE (idAdmin, codeCours, idSalle, idJour, heureDebut) = (?, ?, ?, ?, ?)
            `
            
        const values = [idAdmin, codeCours, idSalle, idJour, heureDebut]

        try {

            const { data, error } = await this.getProgram(payload)

            if(!data.length) return { error: "The course is not found on database" }

            const [rows] = await connection.execute(query, values)

            console.log(rows);

            return { data: "Program deleted on succesfully" }
        }catch(err){
            console.log(err.message)

            return { error: "An error occured while deleting the program" }
        }
    }

    /**
     * This method update a program on database
     * @param {Object} payload contain the beginig and the end hour to update
     * @returns {Object} message or error
     */
    static updateProgram = async (payload) => {

        const { 
            idAdmin, 
            codeCours, 
            idSalle, 
            idJour, 
            heureDebut
        } = payload.key

        const {
            newHeureDebut,
            newHeureFin
        } = payload.data
        
        const query = `
            UPDATE Programmer
            SET heureDebut = (?), heureFin = (?)
            WHERE (idAdmin, codeCours, idSalle, idJour, heureDebut) = (?, ?, ?, ?, ?)
            `
            
        const values = [newHeureDebut, newHeureFin, idAdmin, codeCours, idSalle, idJour, heureDebut]

        try {

            //check if the given program is in database
            const { data, error } = await this.getProgram(payload.key)

            console.log(data);

            if(!data.length) return { error: "The course is not found on database" }

            //update program
            const [rows] = await connection.execute(query, values)

            return { data: "Program updated on succesfully" }
        }catch(err){
            console.log(err.message)

            return { error: "An error occured while updating the program" }
        }
    }

    /**
     * This method get a specific program on database
     * @param {Object} payload id(containing multiple values)
     * @returns {Object}
     */
    static getProgram = async (payload) => {

        const { 
            idAdmin, 
            codeCours, 
            idSalle, 
            idJour, 
            heureDebut
        } = payload

        const query = `
            SELECT * 
            FROM Programmer
            WHERE (idAdmin, codeCours, idSalle, idJour, heureDebut) = (?, ?, ?, ?, ?)
            `
        const values = [idAdmin, codeCours, idSalle, idJour, heureDebut]

        try{
            const [rows] = await connection.execute(query, values)

            console.log(rows);

            return { data: rows }
        }catch(err){
            console.log(err.message)
            return { error: "An error occured while geting the program" }
        }
    }

}

export default planifiedModel