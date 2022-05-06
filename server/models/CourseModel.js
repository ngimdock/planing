import connection from "../utils/index.js";

class CourseModel {
    static init = async (req, res) => {
		const query = `CREATE TABLE IF NOT EXISTS Cours
            (
                codeCours VARCHAR(10) PRIMARY KEY NOT NULL, 
                descriptionCours VARCHAR(30) NOT NULL,
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