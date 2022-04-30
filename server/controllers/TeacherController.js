import TeacherModel from "../models/TeacherModel.js"

class TeacherController {

    /**
     * Fetching all the teachers of the platform
     * @param {null}
     * @returns Object data | error
     */
    static getTeachers = async (req, res) => {
        const data = await TeacherModel.get()

        if(data.length > 0) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ error : " An error occured " })
        }
    }

    /**
     * Fetching the researched teacher from the platform
     * @param {String} matriculeEns The identifier of the teacher we are searching for 
     * @returns data | error
     */
    static getTeacher = async (req, res) => {
        const matriculeEns = req.params.matriculeEns

        if(matriculeEns && typeof matriculeEns === 'string') {
            const data = await TeacherModel.getById(matriculeEns)

            console.log(data.length)

            if(data.length > 0){
                res.status(200).json(data)    
            } else {
                res.status(404).json({ error: "No such teacher "})
            }

        } else {
            res.status(400).json({ error: " Provide all the required data "})
        }
    }

    /**
     * Fetching the new teacher created
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

            if(data) {
                return res.status(201).json(data)
            } else {
                return res.status(500).json({ error: "an error occured" })
            }

        } else {
            return res.status(400).json({ error: "Provide all the required data" })
        }
    }

    /**
     * Fetching the updated teacher infos
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

            if(data && data > 0) {

                const response = await TeacherModel.getById(matriculeEns)

                if(response.length > 0){
                    res.status(200).json(response)    
                } else {
                    res.status(404).json({ error: "No such teacher "})
                }  
            } else {
                res.status(500).json({ error: " An error occured "})
            }
        } else {
            return res.status(400).json({ error : "Provide all the required data" })
        } 
    }
}

export default TeacherController