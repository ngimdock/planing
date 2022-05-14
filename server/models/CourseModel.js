import connection from "../utils/index.js";

class CourseModel {
    static init = async () => {
		const query = `CREATE TABLE IF NOT EXISTS Cours
            (
                codeCours VARCHAR(10) PRIMARY KEY NOT NULL, 
                descriptionCours VARCHAR(200) NOT NULL,
                idSpecialite INTEGER NULL,
                CONSTRAINT FK_CoursSpecialite 
                FOREIGN KEY(idSpecialite) REFERENCES Specialite (idSpecialite)
            )
        `

        try{
            await connection.execute(query)

            console.log("Table Cours OK")
        }catch(err){
            console.log(err);
        }
	}

    static getCourses = async () => {
        const query = `
            SELECT * 
            FROM Cours 
        `

        try{
            const [rows] = await connection.execute(query)

            const subjects = await this.addSpecialityToCourses(rows)

            console.log(subjects)

            return{ data: subjects }
        }catch(err){
            return { error: "An error occured while geting courses" }
        }
    }

    static getAvailableCourses = async (codeClasse) => {
        const query = `
            (
                SELECT * FROM Cours
                EXCEPT
                (
                    SELECT C.codeCours, C.descriptionCours, C.idSpecialite
                    FROM Cours C, Programmer P
                    WHERE C.codeCours = P.codeCours
                )
            )
            UNION
            (
                SELECT C.codeCours, C.descriptionCours, C.idSpecialite
                FROM Cours C, Programmer P, Suivre S, Groupe G, Classe Cla
                WHERE C.codeCours = P.codeCours
                AND C.codeCours = S.codeCours
                AND G.idGroupe = S.idGroupe
                AND Cla.codeClasse = ?
                AND G.codeClasse = Cla.codeClasse
            )
        `

        try {
            const [rows] = await connection.execute(query, [codeClasse])

            const subjects = await this.addSpecialityToCourses(rows)

            return { data: subjects }
        } catch (err) {
            console.log(err)

            return { error: "An error occured" }
        }
    }

    static addSpecialityToCourses = async (data) => {
        const query =  `
            SELECT DISTINCT S.nomSpecialite, S.idSpecialite
            FROM Specialite S, Cours C
            WHERE C.idSpecialite = ?
            AND S.idSpecialite = C.idSpecialite
        `

        const subjects = []

        for (let subject of data) {
            if (!subject.idSpecialite) {
                subjects.push(subject)
            } else {
                const [rows] = await connection.execute(query, [subject.idSpecialite])
    
                const newSubject = {
                    ...subject,
                    nomSpecialite: rows[0].nomSpecialite
                }

                subjects.push(newSubject)
            }
        }

        return subjects
    }

    static createCourse = async (payload) => {

        const {
            codeCours,
            descriptionCours,
            idSpecialite
        } = payload

        const idSpec =  idSpecialite ? idSpecialite : null
        
        const query = `
            INSERT INTO Cours (codeCours, descriptionCours, idSpecialite)
            VALUES(?, ?, ?)
        `

        const values = [codeCours, descriptionCours, idSpec]
        console.log(values)

        try{
            const [rows] = await connection.execute(query, values)

            console.log(rows);
            return { data: "Course was added on sucessfully" }
        }catch(err){
            console.log(err);
            return { error: "An error occur while creating the course" }
        }
    }

    static deleteCourse = async (payload) => {

        const query = `
            DELETE 
            FROM Cours
            WHERE Cours.codeCours = (?)
        `

        try {

            // check if the course exist
            const { data } = await this.getCourse(payload)

            if(!data.length) return { error: "No course found with the given id" }

            const [rows] = await connection.execute(query, [payload])

            console.log(rows);
            return { data: "Course deleted on sucessfully" }
        }catch(err){
            console.log(err.message)
            return { error: "An error occured while deleting course" }
        }
    }

    static getCourse = async (payload) => {

        const query = `
            SELECT * 
            FROM Cours
            WHERE Cours.codeCours = (?)
            `
        try{
            const [rows] = await connection.execute(query, [payload])
            
            return { data: rows }
        }catch(err){
            return { error: "An error occured while geting the course" }
        }
    }

    static updateCourse = async (payload) => {

        console.log(payload)

        const {
            codeCours,
            newCodeCours,
            newDescriptionCours,
            idSpecialite
        } = payload

        const query = `
            UPDATE Cours
            SET codeCours=(?), descriptionCours = (?), idSpecialite = (?)
            WHERE Cours.codeCours = (?)
        `

        try {

            //check if course exist on database
            const { data } = await this.getCourse(codeCours)

            if(!data.length) return { data: "The course with the given code is no found" }

            //update course
            const [rows] = await connection.execute(query, [newCodeCours, newDescriptionCours, idSpecialite, codeCours])

            console.log(rows);

            return { data: rows }
        }catch(err){
            console.log(err.message);
            return { error: "An error occured while updating the course" }
       }
    }

    static checkCode = async (code) => {
        const query = `
            SELECT *
            FROM Cours
            WHERE codeCours = ?
        `

        try {
            const [rows] = await connection.execute(query, [code])

            if (rows.length > 0) {
                return { data: true }
            }

            return { data: false }
        } catch (err) {
            console.log(err)

            return { error: "An error occured while checking the unicity of subject" }
        }
    }
}
export default CourseModel