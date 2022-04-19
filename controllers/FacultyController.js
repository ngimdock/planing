import FacultyModel from "../models/FacultyModel"

class FacultyController {

	static facultyModel = new FacultyModel()

	static getFaculties = async (req, res) => {
		res.send("This is all faculty")
	}

	
	static createFaculty = async (req, res) => {
		
		try{
			const result = await facultyModel.createFaculty()
		}
	}
}

export default FacultyController