import SpecialityModel from "../models/SpecialityModel.js"

class SpecialityController {

    /**
     * 
     */
    static getSpecialities = async (req, res) => {
        res.send("This are all Specialities")
    }

    /**
     * 
     * @param {String} nomSpecialite The name of the Speciality
     * @returns {Object} data | error
     */
    static createSpeciality = async (req, res) => {
        const {
            nomSpecialite
        } = req.body


        if(nomSpecialite) {

            const data = await SpecialityModel.create(data)

            if(data) 
                return res.status(201).json(data)
                
            return res.status(500).json({ error: "An error occured" })
        } else {
            return res.status(400).json({ error: "Provide all the required data" })
        }
    }
}

export default SpecialityController