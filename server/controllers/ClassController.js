import ClassModel from "../models/ClassModel.js"

class ClassController {
  static getClass = async (req, res) => {
		res.send("This is all Classes")
	}

  static createClass = async (req, res) => {
		// Get data from request body
		const {
			codeClasse,
			nomClasse,
			capaciteClasse,
			idFil,
			idNiv
		} = req.body

		if (codeClasse && nomClasse && capaciteClasse && idFil && idNiv) {
			const { data } = await ClassModel.create(req.body)
			
			if(data)
				return res.status(201).json(data)
				
			return res.status(500).json({ error: "an error occured" })
		} else {
			return res.status(400).json({ error: "Provide all the required data" })
		}
	}
}

export default ClassController;