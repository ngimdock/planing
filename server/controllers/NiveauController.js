import NiveauModel from "../models/NiveauModel.js"

class NiveauController {
	static findAllNiveau = async (req, res) => {
		const { data, error } = await NiveauModel.findAll()

		if (data) return res.json({ data })

		return res.status(500).json({ error })
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

	static getNiveauById = async (req, res) => {
		
		const { data } = await NiveauModel.findOne(req.params.id)
		if(data){
			return res.status(201).json(data)
		}
		return { error: "There were an error with getting a single Level" }
	}

	static updateNiveau = async (req, res) =>{

		const id = parseInt(req.params.id, 10)
		if ( id ){

			const { data } = await NiveauModel.findOne(id)
			if (data.length === 0){
				res.status(400).json({message:"not found objet" })
			}
			else {

				const {data: newData, error} = await NiveauModel.update(id, req.body)

				if ( newData ) {
					return res.status(200).json({ newData: { idNiv: id, nomNiv: req.body.nomNiv } })
				}

				return res.status(400).json({error: error})
			}
			return res.status(500).json({ error: "an error occured with updated Level" })
		}
		return res.status(400).json({error: "not found level"})
	}

	static deleteNiveau = async (req, res) =>{

		const id = parseInt(req.params.id, 10)
		

		if(id){
			const { data } = await NiveauModel.findOne(id)
		
			if(data){
				const {data: newData, error} = await NiveauModel.delete(id)
				if(newData)
					return res.status(200).json(newData)
				return res.status(400).json({ error })
			}
			return res.status(500).json({ error: "an error occured with  Level" })
		}
		return res.status(400).json({error: "not found level"})
	}
}

export default NiveauController;

