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
                idSemestre INTEGER,
                matriculeEns VARCHAR(10),
                heureDebut TIME,
                heureFin TIME NOT NULL,
                CONSTRAINT PK_Programmer 
                PRIMARY KEY(idAdmin, codeCours, idSalle, idJour, idSemestre, matriculeEns, heureDebut),
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
                ON UPDATE CASCADE,
                CONSTRAINT FK_ProgrammerSemestre
                FOREIGN KEY(idSemestre) REFERENCES Semestre(idSemestre)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                CONSTRAINT FK_ProgrammerEnseignant
                FOREIGN KEY(matriculeEns) REFERENCES Enseignant(matriculeEns)
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
            SELECT DISTINCT P.codeCours, C.descriptionCours, S.idSalle, nomSal, E.matriculeEns, E.nomEns, nomJour, heureDebut, heureFin, Cla.codeClasse, F.idFil, F.nomFil, G.nomGroupe, G.idGroupe
            FROM Programmer P, Cours C,  Salle S, Jour J, Enseignant E, AnneeAcademique A, Semestre Se, Suivre Sui, Groupe G, Classe Cla, Filiere F
            WHERE (Se.idSemestre = ?)
            AND (Se.idAnneeAca = (?))
            AND (P.idSalle = S.idSalle) 
            AND (P.codeCours = C.codeCours) 
            AND (P.idJour = J.idJour) 
            AND (P.matriculeEns = E.matriculeEns)
            AND (P.idSemestre = Se.idSemestre)
            AND (C.codeCours = Sui.codeCours)
            AND (Sui.idGroupe = G.idGroupe)
            AND (Cla.CodeClasse = G.codeClasse)
            AND (Cla.idFil = F.idFil)
            ORDER BY J.nomJour ASC
        `

        try{
            const [rows] = await connection.execute(query, [idSemestre, idAnneeAca])

            // Format data section

            console.log(rows);

            const programsByFaculties = this.FormatProgram(rows)

            return{ data: programsByFaculties }
        }catch(err){

            console.log(err.message);
            return { error: "An error occured while geting Programs" }
        }
    }

    static SimpleFormatProgram = (data, type) => {

        const property = type === "teacher" ? "NameTeacher" : "CodeRoom"
        const value = type === "teacher" ? data[0].nomEns : data[0].nomSal
        
        // data formated
        const programsFormated = {
            [property] : value,
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

        // remove teacher's name from all data
        const formatData = data.map(program => {
            return({
                subjectCode: program.codeCours,
                subjectDescription: program.descriptionCours,
                roomName: program.nomSal,
                teacherName: program.nomEns,
                day: program.nomJour,
                group: program.nomGroupe,
                startHour: program.heureDebut,
                endHour: program.heureFin
            })
        })

        for(let program of formatData){
            programsFormated.programs[program.day].push(program)
        }

        return programsFormated
    }

    static FormatProgram = (data, type = "all") => {
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

        // Initial data
        const programsByFaculties = []

        // Loop through the rows and organize the program
        for (let prog of data) {
            // Initial data of program
            const program = {
                subjectCode: prog.codeCours,
                subjectDescription: prog.descriptionCours,
                roomId: prog.idSalle,
                roomName: prog.nomSal,
                teacherMatricule: prog.matriculeEns,
                teacherName: prog.nomEns,
                day: prog.nomJour,
                groupId: prog.idGroupe,
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
                        id: prog.idFil,
                        classes: [myClass]
                    }

                    // Put facProgram inside the list of faculties programs
                    programsByFaculties.push(facProgram)
                }
            }
        }

        return type === "all" ? programsByFaculties : programsByFaculties[0]
    }

    static getProgramsByFaculty = async (payload) => {
        const { 
            idAnneeAca, 
            idSemestre,
            idFiliere
        } = payload

        const query = `
            SELECT DISTINCT P.codeCours, C.descriptionCours, S.idSalle, nomSal, E.matriculeEns, E.nomEns, nomJour, heureDebut, heureFin, Cla.codeClasse, F.idFil, F.nomFil, G.nomGroupe, G.idGroupe
            FROM Programmer P, Cours C,  Salle S, Jour J, Enseignant E, AnneeAcademique A, Semestre Se, Suivre Sui, Groupe G, Classe Cla, Filiere F
            WHERE (Se.idSemestre = ?)
            AND (Se.idAnneeAca = (?))
            AND (P.idSalle = S.idSalle) 
            AND (P.codeCours = C.codeCours) 
            AND (P.idJour = J.idJour) 
            AND (P.matriculeEns = E.matriculeEns)
            AND (P.idSemestre = Se.idSemestre)
            AND (C.codeCours = Sui.codeCours)
            AND (Sui.idGroupe = G.idGroupe)
            AND (Cla.CodeClasse = G.codeClasse)
            AND (Cla.idFil = ?)
            AND (Cla.idFil = F.idFil)
            ORDER BY heureDebut ASC
        `

        try{
            const [rows] = await connection.execute(query, [idSemestre, idAnneeAca, idFiliere])

            // Format program
            const programsByFaculty = this.FormatProgram(rows, "faculty")

            return { data: programsByFaculty ? programsByFaculty : {} }
        } catch (err) {
            console.log(err)

            return { error: "An error occured" }
        }
    }

    static getProgramByclass = async (payload) => {
        const {
            idAnneeAca,
            idSemestre,
            codeClasse
        } = payload

        const query = `
            SELECT DISTINCT P.codeCours, C.descriptionCours, S.idSalle, nomSal, E.matriculeEns, E.nomEns, nomJour, heureDebut, heureFin, Cla.codeClasse, F.idFil, F.nomFil, G.nomGroupe, G.idGroupe
            FROM Programmer P, Cours C,  Salle S, Jour J, Enseignant E, AnneeAcademique A, Semestre Se, Suivre Sui, Groupe G, Classe Cla, Filiere F
            WHERE (Se.idSemestre = ?)
            AND (Se.idAnneeAca = (?))
            AND (P.idSalle = S.idSalle) 
            AND (P.codeCours = C.codeCours) 
            AND (P.idJour = J.idJour) 
            AND (P.matriculeEns = E.matriculeEns)
            AND (P.idSemestre = Se.idSemestre)
            AND (C.codeCours = Sui.codeCours)
            AND (Sui.idGroupe = G.idGroupe)
            AND (Cla.codeClasse = (?))
            AND (Cla.CodeClasse = G.codeClasse)
            AND (Cla.idFil = F.idFil)
            ORDER BY J.nomJour ASC
        `

        try{
            const [rows] = await connection.execute(query, [Number(idSemestre), Number(idAnneeAca), codeClasse])

            const formatedData = this.FormatProgram(rows, "class")

            console.log(rows)

            return { data: formatedData ? formatedData : false }
        }catch(err){
            console.log(err);
            return { error: "An error occured while getting programs by class" }
        }
    }

    static getProgramByTeacher = async (payload) => {

        const {
            idAnneeAca,
            idSemestre,
            matriculeEns
        } = payload

        const query = `
            SELECT DISTINCT Cou.codeCours, Cou.descriptionCours, Sal.nomSal, Ens.nomEns, Jou.nomJour, Gro.nomGroupe, Pro.heureDebut, Pro.heureFin
            FROM Programmer Pro, Cours Cou, Salle Sal, Enseignant Ens, Jour Jou, Groupe Gro, Suivre Sui, Semestre Sem
            WHERE (Sem.idSemestre = (?))
            AND (Sem.idAnneeAca = ?)
            AND (Ens.matriculeEns = (?))
            AND (Pro.codeCours = Cou.codeCours)
            AND (Pro.idSalle = Sal.idSalle)
            AND (Pro.idJour = Jou.idJour)
            AND (Cou.codeCours = Sui.codeCours)
            AND (Sui.idGroupe = Gro.idGroupe)
            AND (Pro.matriculeEns = Ens.matriculeEns)
            AND (Pro.idSemestre = Sem.idSemestre)
        `

        try{
            const [rows] = await connection.execute(query, [idSemestre, idAnneeAca, matriculeEns])

            const programFormated = this.SimpleFormatProgram(rows, "teacher")

            return { data: programFormated }
        }catch(err){
            console.log(err.message)

            return{ error: "An error occured while geting programs by teachers" }
        }
    }

    static getProgramByRoom = async (payload) => {

        const {
            idAnneeAca,
            idSemestre,
            idSalle
        } = payload

        const query = `
            SELECT DISTINCT Cou.codeCours, Cou.descriptionCours, Sal.nomSal, Ens.nomEns, Jou.nomJour, Gro.nomGroupe, Pro.heureDebut, Pro.heureFin
            FROM Programmer Pro, Cours Cou, Salle Sal, Enseignant Ens, Jour Jou, Groupe Gro, Suivre Sui, Semestre Sem, AnneeAcademique Ann
            WHERE (Ann.idAnneeAca = (?))
            AND (Sem.idSemestre = (?))
            AND (Sal.idSalle = (?))
            AND (Pro.codeCours = Cou.codeCours)
            AND (Pro.idSalle = Sal.idSalle)
            AND (Pro.idJour = Jou.idJour)
            AND (Cou.codeCours = Sui.codeCours)
            AND (Sui.idGroupe = Gro.idGroupe)
            AND (Sem.idAnneeAca = Ann.idAnneeAca)
            AND (Pro.matriculeEns = Ens.matriculeEns)
            AND (Pro.idSemestre = Sem.idSemestre)
        `

        try{
            const [rows] = await connection.execute(query, [idAnneeAca, idSemestre, Number(idSalle)])

            const formatedData = this.SimpleFormatProgram(rows, "room")

            return { data: formatedData }
        }catch(err){
            console.log(err.message)

            return{ error: "An error occured while geting programs by room" }
        }
    }

    /**
     * fetch the programs base on the year, semester and classes of the planing on database
     * @returns {object}
     */
     static getClassPrograms = async (payload) => {

        const { idAnneeAca, idSemestre, codeClasse } = payload

        const query = `SELECT DISTINCT P.codeCours, C.descriptionCours, nomSal, E.nomEns, nomJour, heureDebut, heureFin, Cla.codeClasse, F.nomFil, G.nomGroupe
                        FROM Programmer P, Cours C,  Salle S, Jour J, Enseignant E, AnneeAcademique A, Semestre Se, Suivre Sui, Groupe G, Classe Cla, Filiere F
                        WHERE (C.idSemestre = (?))
                        AND (Se.idAnneeAca = (?))
                        AND (Cla.codeClass = (?))
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
            const [rows] = await connection.execute(query, [idSemestre, idAnneeAca, codeClasse])

            return{ data: rows }
        }catch(err){

            console.log(err.message);
            return { error: "An error occured while geting classe Programs" }
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
            matriculeEns,
            idSemestre,
            heureDebut,
            heureFin
        } = payload

        const query = `
            INSERT INTO Programmer(idAdmin, codeCours, idSalle, idJour, matriculeEns, idSemestre, heureDebut, heureFin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `

        const values = [idAdmin, codeCours, idSalle, idJour, matriculeEns, idSemestre, heureDebut, heureFin]
        console.log({ values })

        try{
            const [rows] = await connection.execute(query, values)
            console.log(rows)
            return { data: "Program has been created successfully!!" }
        }catch(err){
            console.log(err)

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
            matriculeEns, 
            idSemestre,
            heureDebut
        } = payload

        
        const query = `
            DELETE
            FROM Programmer
            WHERE (idAdmin, codeCours, idSalle, idJour, matriculeEns, idSemestre, heureDebut) = (?, ?, ?, ?, ?, ?, ?)
            `
            
        const values = [idAdmin, codeCours, idSalle, idJour, matriculeEns, idSemestre, heureDebut]

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