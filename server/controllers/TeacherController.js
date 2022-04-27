import TeacherModel from "../models/TeacherModel.js"

class TeacherController {

    /**
     * 
     */
    static getTeachers = async (req, res) => {
        res.send("This are all Teachers")
    }

    /**
     * @param {String} matriculeEns The teacher's matricule
     * @param {String} nomEns The teacher's name
     * @param {String} sexEns The teacher's gender
     * @returns {Object} data | error
     */
    static createTeacher = async (req, res) => {
        // Get data from the request body
        const {
            matriculeEns,
            nomEns,
            sexEns
        } = req.body

        if (matriculeEns && nomEns && sexEns) {
            const { data } = await TeacherModel.create(req.body)

            if(data)
                return res.status(201).json(data)

            return res.status(500).json({ error: "an error occured" })
        } else {
            return res.status(400).json({ error: "Provide all the required data" })
        }

    }
}

export default TeacherController