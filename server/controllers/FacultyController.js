import FacultyModel from "../models/FacultyModel.js"

class FacultyController {

	static getFaculties = async (req, res) => {
		const { data, error } = await FacultyModel.findAll()

		if (data) return res.json({ data })

		return res.status(500).json({ error })
	}
	
	static createFaculty = async (req, res) => {

		const { data } = await FacultyModel.create(req.body)
		
		if(data)
			return res.status(201).json(data)
		return res.status(500).json({ error: "an error occured" })
	}
}

export default FacultyController