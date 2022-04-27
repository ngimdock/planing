import ClassModel from "../models/ClassModel.js"

class ClassController {
    static getClass = async (req, res) => {
		res.send("This is all Classes")
	}

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
		.catch(err => {
			return console.log(err);
		});
		console.log(data)
		if(data){
			return res.status(201).json(data)
		}
		return { error: "There were an error with getting the data of classes" }
	}


}

export default ClassController;