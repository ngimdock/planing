import NiveauModel from "../models/NiveauModel.js"

class NiveauController {
	
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

	static updateNiveau = async (req, res) =>{

		const id = parseInt(req.params.id, 10)
		if ( id ){

			const { data } = await NiveauModel.findOne(id)
			if (data.length === 0){
				res.status(400).json({message:"not found objet" })
			}
			else {

				const {data: newData, error} = await NiveauModel.update(id, req.body)
				if ( newData )
					return res.status(201).json({message: "sucessful update"})
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

