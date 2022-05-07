import connection from "../utils/index.js";

class CourseModel {
    static init = async () => {
		const query = `CREATE TABLE IF NOT EXISTS Cours
            (
                codeCours VARCHAR(10) PRIMARY KEY NOT NULL, 
                descriptionCours VARCHAR(200) NOT NULL,
                idSemestre INTEGER NOT NULL,
                matriculeEns VARCHAR(10) NOT NULL, 
                idSpecialite INTEGER,
                CONSTRAINT FK_CoursEnseignant 
                FOREIGN KEY(matriculeEns) REFERENCES Enseignant (matriculeEns),
                CONSTRAINT FK_CoursSemestre 
                FOREIGN KEY(idSemestre) REFERENCES Semestre (idSemestre),
                CONSTRAINT FK_CoursSpecialite 
                FOREIGN KEY(idSpecialite) REFERENCES Specialite (idSpecialite)
            )
        `

        try{
            const result = await connection.execute(query)

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

            const subjectWithTeachers = await this.addTeacheToCourses(rows)
            const subjectsWithSemesters = await this.addSemesterToCourses(subjectWithTeachers)
            const subjectsWithSpeciality = await this.addSpecialityToCourses(subjectsWithSemesters)

            console.log(rows);
            return{ data: subjectsWithSpeciality }
        }catch(err){
            return { error: "An error occured while geting courses" }
        }
    }

    static addTeacheToCourses = async (data) => {
        const query = `
            SELECT DISTINCT E.matriculeEns, nomEns
            FROM Cours C, Enseignant E
            WHERE C.matriculeEns = ?
            AND C.matriculeEns = E.matriculeEns
        `

        const subjects = []

        for (let subject of data) {
            const [rows] = await connection.execute(query, [subject.matriculeEns])

            const newSubject = {
                ...subject,
                nomEns: rows[0].nomEns
            }

            subjects.push(newSubject)
        }

        return subjects
    }

    static addSemesterToCourses = async (data) => {
        const query = `
            SELECT DISTINCT S.idSemestre, S.valSemestre
            FROM Semestre S, Cours C
            WHERE C.idSemestre = ?
            AND C.idSemestre = S.idSemestre
        `

        const subjects = []

        for (let subject of data) {
            const [rows] = await connection.execute(query, [subject.idSemestre])

            console.log(rows)

            const newSubject = {
                ...subject,
                valSemestre: rows[0].valSemestre
            }

            subjects.push(newSubject)
        }

        return subjects
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
            idSemestre,
            matriculeEns,
            idSpecialite
        } = payload
        
        const query = `
            INSERT INTO Cours (codeCours, descriptionCours, idSemestre, matriculeEns, idSpecialite)
            VALUES(?, ?, ?, ?, ?)
        `

        const values = [codeCours, descriptionCours, idSemestre, matriculeEns, idSpecialite]

        try{
            const [rows] = await connection.execute(query, values)

            console.log(rows);
            return { data: "Course was added on sucessfully" }
        }catch(err){
            console.log(err.message);
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

        const {
            codeCours,
            newDescriptionCours
        } = payload

        const query = `
            UPDATE Cours
            SET descriptionCours = (?)
            WHERE Cours.codeCours = (?)
        `

        try {

            //check if course exist on database
            const { data } = await this.getCourse(codeCours)

            if(!data.length) return { data: "The course with the given code is no found" }

            //update course
            const [rows] = await connection.execute(query, [newDescriptionCours, codeCours])

            console.log(rows);

            return { data: "Course updated on sucessfully" }
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