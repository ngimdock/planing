import FacultyModel from "../models/FacultyModel.js"

class FacultyController {

	static getFaculties = async (req, res) => {
		res.send("This is all faculty")
	}

	
	static createFaculty = async (req, res) => {

		const { data } = await FacultyModel.create(req.body)
		
		if(data)
			return res.status(201).json(data)
		return res.status(500).json({ error: "an error occured" })
	}
}

export default FacultyController