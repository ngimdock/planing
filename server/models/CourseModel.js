import connection from "../utils/index.js";

class CourseModel {
    static init = async (req, res) => {
		const query = `CREATE TABLE IF NOT EXISTS Course  
                        (
                            codeCours VARCHAR(10) PRIMARY KEY NOT NULL, 
                            descriptionCours VARCHAR(30) NOT NULL
                            idSemestre INTEGER FOREIN KEY NOT NULL,
                            matriculeEns VARCHAR(10) FOREIN KEY NOT NULL, 
                            idspecialite INTEGER FOREIN KEY NOT NUL,
                        )`
        try{
            const result = connection.execute(query)
            console.log(result);

            console.log("Table Cours OK")
        }catch(err){
            console.log(err);
        }
	}
}
export default CourseModel