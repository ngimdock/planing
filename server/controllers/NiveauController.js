import NiveauModel from "../models/NiveauModel.js"

class NiveauController {
	
	static createNiveau = async (req, res) => {

		const { data } = await NiveauModel.create(req.body)
		
		if(data)
			return res.status(201).json(data)
		return res.status(500).json({ error: "an error occured with creating Level" })
	}
	
	static findAllNiveau = async (req, res)=>{

		const { data } = await NiveauModel.findAll()
		if(data){
			return res.status(201).json(data)
		}
		return { error: "There were an error with getting the Level list" }
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

		if(id){
			const { data } = await NiveauModel.update(id, req.body)
		
			if(data){
				return res.status(201).json(data)
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
					return res.status(201).json(data)
				return res.status(400).json({ error })
			}
			return res.status(500).json({ error: "an error occured with  Level" })
		}
		return res.status(400).json({error: "not found level"})
	}
}

export default NiveauController;

