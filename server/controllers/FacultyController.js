import FacultyModel from "../models/FacultyModel.js"

class FacultyController {

	static getFaculties = async (req, res) => {
		const { data, error } = await FacultyModel.findAll()

		if (data) return res.json({ data })

		return res.status(500).json({ error })
	}
	
	static createFaculty = async (req, res) => {
		console.log(req.body)

		const { data } = await FacultyModel.create(req.body)
		
		if(data)
			return res.status(201).json({data})
		return res.status(500).json({ error: "an error occured" })
	}

	static updateFaculty = async (req, res) => {
		const { nomFil } = req.body
		const { idFil } = req.params

		if (nomFil && idFil) {
			const { data, error } = await FacultyModel.update({ nomFil, idFil })

			if (data) {
				return res.json({ data })
			}

			return res.status(500).json({ error })
		}

		return res.status(400).json({ error: "Provide all the required data" })
	}
}

export default FacultyController