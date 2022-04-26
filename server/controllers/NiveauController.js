import NiveauModel from "../models/NiveauModel.js"

class NiveauController {
    static getNiveau = async (req, res) => {
		res.send("This is all Niveau")
	}

	
	static createNiveau = async (req, res) => {
		// Get data from request body
		const {
			nomNiv
		} = req.body

		if (nomNiv) {
			const { data } = await NiveauModel.create(nomNiv)
			
			if(data)
				return res.status(201).json(data)

			return res.status(500).json({ error: "An error occured" })
		} else {
			res.status(400).json({ error: "Provide all the name of the level" })
		}
	}

}

export default NiveauController;

