import connection from "../utils/index.js";

class CourseModel {
    static init = async () => {
		const query = `CREATE TABLE IF NOT EXISTS Cours
            (
                codeCours VARCHAR(10) PRIMARY KEY NOT NULL, 
                descriptionCours VARCHAR(30) NOT NULL,
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

    static getCourses = async (req, res) => {

        const query = `SELECT * 
                       FROM Cours
                       `

        try{
            const result = connection.execute(query)

            console.log(result);
            return{ data: result }
        }catch(err){
            return { error: "An error occured when geting courses" }
        }
    }
}
export default CourseModel