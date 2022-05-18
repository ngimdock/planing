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

		if(
			!codeClasse ||
			!nomClasse ||
			!capaciteClasse ||
			!idFil ||
			!idNiv 
		) {
			return res.status(400).json({message:"please complete all required field" })
    } else {
			const { data } = await ClassModel.create(req.body)
			
			if (data) {
				// insert of specialities
				let isOk = true
				let groups_spec = false
				let groups_classe = false

				for (let speciality of specialities) {
					const {  value, capacity, groups: specGroups } = speciality

					const { data } = await Classe_specModel.create({ idSpec: value, capacity, codeClasse })

					if (data) {
						console.log("Speciality OK")
						// creation de groupe de specialite
						for (const group of specGroups) {
							const { 
								name,
								capacity	
							} = group
							
							const { data } = await GroupModel.create({ nomGroupe: name, capaciteGroupe: capacity, codeClasse, idSpec: value })

							if (data){
								console.log("Groupe speciality OK")
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
						name,
						capacity	
					} = group
					
					const { data } = await GroupModel.create({ nomGroupe: name, capaciteGroupe: capacity, codeClasse, idSpec: null })

					if (data){
						groups_classe = true
						console.log("Groupe OK")
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
		
		const { codeClasse, nomClasse, capaciteClasse, idFil, idNiv, specialities, groups } = req.body
		if ( codeClasse ){

			const { data } = await ClassModel.findOne(codeClasse)
			if (data.length === 0){
				res.status(400).json({message:"not found objet" })
			}
			else {
				let isSet = true
				if (specialities) {
					const { data: dataSpec } = await Classe_specModel.findAllSpec(codeClasse)
					if (dataSpec) {
						console.log("dataFound", dataSpec)
	
						for(let classe_spec of dataSpec){
							const {codeClass, idSpec} = classe_spec
	
							if (codeClass && idSpec ) {
								
								const { data:dataDel, error} = await Classe_specModel.delete(codeClasse, idSpec)
								console.log(dataDel)
								if (error){
									return res.status(500).json({error: error})
								}
							}
						}
					} 

					for (let speciality of specialities) {

						const { idSpec, capacity} = speciality
						const  {data:dataUpdated, error }  = await Classe_specModel.create({codeClasse, idSpec, capacity})
						console.log("spec", dataUpdated)
						
						if (error) {
							return res.status(500).json({error:error})
						}
					
					}
				}

				if (nomClasse && capaciteClasse && idFil && idNiv) {
					const {data: newData} = await ClassModel.update(codeClasse, {nomClasse, capaciteClasse, idFil, idNiv})
					if (!newData) {
						isSet = false
					}
				}

				if (isSet){
					return res.status(201).json({message: "sucessful update a Classe_spec "})
				}
					
				return res.status(400).json({error: "an error occured with update classe_spec or groups"})
			}
			return res.status(500).json({ error: "an error occured with updated Class" })
		}
		return res.status(400).json({error: "not found Class"})
	}

	static updateGroup = async (req, res) =>{
		const { id } = req.params
		const {
			nomGroupe,
			capaciteGroupe,
			codeClasse,
			idSpecialite
		} = req.body

		if ( id ) {
			const data = await GroupModel.getById(id)

			if(data){
				const { data: new_data, error} = GroupModel.update({nomGroupe, capaciteGroupe, codeClasse, idSpecialite:null}, id)
				
				if (error) {
					return res.status(500).json({error: error})
				}
				return res.status(201).json({message: "sucessful update a Group"})
			}
		}
	}

	static deleteGroup = async (req,res) => {
		const { id } = req.params
		if (id) {
			const {data} = await GroupModel.getById(id)

			if (data) {
				const {data: new_data, error} = await GroupModel.delete(id)
				if(error){
					return res.status(500).json({error: error})
				}
				return res.status(201).json({message: "sucessful delete"})
			}
		}
	}
	//delete classe with classe_spec
	static deleteClasse = async (req, res) =>{

		const { codeClasse } = req.params
		console.log(codeClasse)
		if(codeClasse){
			const { data } = await ClassModel.findOne(codeClasse)
		
			if(data){ 
				const { data: dataSpec } = await Classe_specModel.findAllSpec(codeClasse)
				if (dataSpec) {
					// let classe_spec = true

					for(let classe_spec of dataSpec){
						const {codeClasse, idSpec} = classe_spec

						if (codeClasse && idSpec ) {
							const { data:dataFound } = await Classe_specModel.findOne(codeClasse, idSpec)

							if (dataFound){
								const {data:dataDel, error} = await Classe_specModel.delete(codeClasse, idSpec)
								if (error){
									return res.status(500).json({error: error})
								}
							}
						}
					}
				} 
				const {data: newData, error} = await ClassModel.delete(codeClasse)
				if(newData)
					return res.status(200).json(newData)
				return res.status(500).json({ error })
			}
			return res.status(500).json({ error: "an error occured with  Class" })
		}
		return res.status(400).json({error: "not found Class"})
	}
	// delete de classe_spec individuelle
	static deleteClasse_spec = async (req, res) =>{

		const { codeClasse, idSpec } = req.body

		if(codeClasse && idSpec){
			const { data } = await Classe_specModel.findOne(codeClasse, idSpec)
			console.log("find", data)
		
			if(data){
				const {data: newData, error} = await Classe_specModel.delete(codeClasse, idSpec)
				if(newData){
					return res.status(200).json(newData)
				}
				return res.status(400).json({ error })
			}
			return res.status(500).json({ error: "an error occured with  Class" })
		}
		return res.status(400).json({error: "not found Class"})
	}
}

export default ClassController;