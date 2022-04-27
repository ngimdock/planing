import ClassModel from "../models/ClassModel.js"

class ClassController {

    static createClass = async (req, res) => {

		if(req.body.constructor === Object && Object.keys(req.body).length === 0){

           return res.status(400).json({message:"please complete all required field" })
        }else{
			console.log(req.body)
			const { data } = await ClassModel.create(req.body)
			console.log(data)
			if(data)
				return res.status(201).json(data)
			return res.status(500).json({ error: "an error occured" })
		}	
	}

	static findAllClass = async (req, res)=>{

		const { data } = await ClassModel.findAll()
		
		if(data){
			return res.status(201).json(data)
		}
		return { error: "There were an error with getting the data of classes" }
	}

	static findById = async (req, res)=>{

		const{ codeClasse } = req.body

		if (codeClasse) {
			const { data } = await ClassModel.findOne(codeClasse)

			console.log(data)
			if(data){
				return res.status(201).json(data)
			}
		}
		return { error: "There were an error with getting the data of classes" }
	}

	static updateClass = async (req, res) =>{

		const { codeClasse } = req.body
		if ( codeClasse ){

			const { data } = await ClassModel.findOne(codeClasse)
			if (data.length === 0){
				res.status(400).json({message:"not found objet" })
			}
			else {

				const {data: newData, error} = await ClassModel.update(codeClasse, req.body)
				if ( newData )
					return res.status(201).json({message: "sucessful update a Class "})
				return res.status(400).json({error: error})
			}
			return res.status(500).json({ error: "an error occured with updated Class" })
		}
		return res.status(400).json({error: "not found Class"})
	}

	static deleteClasse = async (req, res) =>{

		const { codeClasse } = req.body
		if(codeClasse){
			const { data } = await ClassModel.findOne(codeClasse)
		
			if(data){
				const {data: newData, error} = await ClassModel.delete(codeClasse)
				if(newData)
					return res.status(200).json(newData)
				return res.status(400).json({ error })
			}
			return res.status(500).json({ error: "an error occured with  Class" })
		}
		return res.status(400).json({error: "not found Class"})
	}

}

export default ClassController;