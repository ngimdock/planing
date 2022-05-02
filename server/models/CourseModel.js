import connection from "../utils/index.js";

class CourseModel {
    static init = async () => {
		const query = `CREATE TABLE IF NOT EXISTS Cours
            (
                codeCours VARCHAR(10) PRIMARY KEY NOT NULL, 
                descriptionCours VARCHAR(30) UNIQUE NOT NULL,
                idSemestre INTEGER NOT NULL,
                matriculeEns VARCHAR(10) NOT NULL, 
                idSpecialite INTEGER NOT NULL,
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

        const query = `SELECT * 
                       FROM Cours
                       `

        try{
            const [rows] = await connection.execute(query)

            console.log(rows);
            return{ data: rows }
        }catch(err){
            return { error: "An error occured while geting courses" }
        }
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

}
export default CourseModel