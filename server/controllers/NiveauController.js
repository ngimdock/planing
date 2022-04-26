import NiveauModel from "../models/NiveauModel.js"

class NiveauController {
    static getNiveau = async (req, res) => {
		res.send("This is all Niveau")
	}

	
	static createNiveau = async (req, res) => {

		const { data } = await NiveauModel.create(req.body)
		
		if(data)
			return res.status(201).json(data)
		return res.status(500).json({ error: "an error occured" })
	}

}

export default NiveauController;

