import ClassModel from "../models/ClassModel.js"
import Classe_specModel from '../models/Classe_specModel.js';
import GroupModel from "../models/GroupModel.js";

class ClassController {

  static createClass = async (req, res) => {
		// Get data from request body
		const {
			codeClasse,
			nomClasse,
			capaciteClasse,
			idFil,
			idNiv,
			groups,
			specialities
		} = req.body

		if(req.body.constructor === Object && Object.keys(req.body).length === 0){

           return res.status(400).json({message:"please complete all required field" })
        }else{
			const { data } = await ClassModel.create(req.body)
			
			if(data) {
				// insert of specialities
				let isOk = true
				let  groups_spec =false
				let  groups_classe =false

				for (let speciality of specialities) {
					const { id: idSpec, capacity, groups } = speciality

					const { data } = await Classe_specModel.create({ idSpec, capacity, codeClasse })

					if (data) {
						// creation de groupe de specialite
						for (const group of groups) {
							const { 
								nomGroupe,
								capaciteGroupe	
							} = group
							
							const { data } = await GroupModel.create({nomGroupe, capaciteGroupe, codeClasse, idSpec })

							if (data){
								console.log(idSpec)
								groups_spec = true
							}
						}
					} else {
						isOk = false
						break
					}
				}
				//creation de groupe de classe
				for (const group of groups) {
					const { 
						nomGroupe,
						capaciteGroupe	
					} = group
					
					const { data } = await GroupModel.create({nomGroupe, capaciteGroupe, codeClasse, idSpec: null })

					if (data){
						
						groups_classe = true
					}
				}

				if (isOk) {
					if (groups_spec && groups_classe){
						return res.status(201).json({ data: "class created with groups, specialities and groups of those specialities" })
					} else {
						if (groups_spec) {
							return res.status(201).json({ data: "class created with specialities and groups of those specialities" })	
						}
						if (groups_classe) {
							return res.status(201).json({ data: "class created with groups" })	
						}
					}
					return res.status(201).json({ data: "class created with specialities" })
				}

				return res.status(500).json({ error: "error occured while creating class spec" })
			}

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

		const { codeClasse, specialities } = req.body
		if ( codeClasse ){

			const { data } = await ClassModel.findOne(codeClasse)
			if (data.length === 0){
				res.status(400).json({message:"not found objet" })
			}
			else {

				const {data: newData, error} = await ClassModel.update(codeClasse, req.body)
				if ( newData ){

					let isSet = true

					for (let speciality of specialities) {
						const { idSpec, capacity } = speciality
	
						const { data } = await Classe_specModel.update(codeClasse, { idSpec, capacity})
	
						if (data) {
							// update groups
						} else {
							isSet = false
							break
						}
					}

					if (isSet){
						return res.status(201).json({message: "sucessful update a Classe_spec "})
					}
				}
					
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