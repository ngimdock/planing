import ClassModel from "../models/ClassModel.js"

class ClassController {
    static getClass = async (req, res) => {
		res.send("This is all Classes")
	}

    static createClass = async (req, res) => {

		const { data } = await ClassModel.create(req.body)
		
		if(data)
			return res.status(201).json(data)
		return res.status(500).json({ error: "an error occured" })
	}
}

export default ClassController;