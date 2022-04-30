import SpecialityModel from "../models/SpecialityModel.js"

class SpecialityController {

    /**
     * Fetching all the specialities of the platform
     * @param {null}
     * @returns Object data | error
     */
    static getSpecialities = async (req, res) => {
        const data = await SpecialityModel.get()

        if(data.length > 0) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ error : " An error occured " })
        }
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

            const { data } = await SpecialityModel.create(req.body)

            if(data) 
                return res.status(201).json(data)
                
            return res.status(500).json({ error: "An error occured" })
        } else {
            return res.status(400).json({ error: "Provide all the required data" })
        }
    }
}

export default SpecialityController