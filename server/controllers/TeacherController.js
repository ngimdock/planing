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

     /**
     * @param {String} newMatriculeEns The teacher's new matricule
     * @param {String} matriculeEns The teacher's current matricule
     * @param {String} nomEns The teacher's name
     * @param {String} sexEns The teacher's gender
     * @returns {Object} data | error
     */
    static updateTeacher = async (req, res) =>  {
        const {
            matriculeEns,
            nomEns,
            sexEns
        } = req.body

        const currentMatriculeEns = req.params.currentMatriculeEns

        if(currentMatriculeEns && (matriculeEns || nomEns || sexEns)) {

            const data = await TeacherModel.update(req.body, currentMatriculeEns)

            console.log(data)

            if(data > 0)
                return res.status(200).json({ message : " The Teacher infos has been successfully modified "})
            
            // TODO -- Implement the Select Teacher by matricule method and use it here
            // so as to return the newly modified teacher infos

            return res.status(500).json({ error : " An error occured "})
        } else {
            return res.status(400).json({ error : "Provide all the required data" })
        } 
    }
}

export default TeacherController