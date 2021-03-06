import SpecialityModel from "../models/SpecialityModel.js"

class SpecialityController {

    /**
     * Fetching all the specialities of the platform
     * @param {null}
     * @returns Object data | error
     */
    static getSpecialities = async (req, res) => {
        const { data } = await SpecialityModel.get()

        if (data !== undefined) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ error : " An error occured " })
        }
    }

    /**
     * Fetching the researched speciality from the platform
     * @param {String} idSpecialite The identifier of the speciality we are searching for 
     * @returns data | error
     */
     static getSpeciality = async (req, res) => {
        const idSpecialite = parseInt(req.params.idSpecialite)

        if(idSpecialite && Number.isInteger(idSpecialite)) {
            const data = await SpecialityModel.getById(idSpecialite)

            if(data.length > 0){
                res.status(200).json(data)    
            } else {
                res.status(404).json({ error: " No such speciality "})
            }
        } else {
            res.status(400).json({ error: " Provide all the required data "})
        }
    }

    /**
     * Fetching the newly created speciality 
     * @param {String} nomSpecialite The name of the Speciality
     * @returns {Object} data | error
     */
    static createSpeciality = async (req, res) => {
        const {
            nomSpecialite
        } = req.body

        if(nomSpecialite && typeof nomSpecialite === 'string' && nomSpecialite != '') {

            const { data } = await SpecialityModel.create(req.body)

            if(data) {
                return res.status(201).json(data)
            } else {
                return res.status(500).json({ error: "An error occured" })
            }                
        } else {
            return res.status(400).json({ error: "Provide all the required data" })
        }
    }

    /**
     * Fetching the updated Speciality infos
     * @param {String} idSpecialite The identifier of the speciality we are searching for 
     * @returns {Object} data | error
     */
     static updateSpeciality = async (req, res) =>  {
        const {
            nomSpecialite,
        } = req.body

        const idSpecialite = parseInt(req.params.idSpecialite)
        
        if(nomSpecialite && idSpecialite
             && typeof nomSpecialite === 'string', nomSpecialite != '' 
             && Number.isInteger(idSpecialite)) {

            const data = await SpecialityModel.update(idSpecialite, nomSpecialite)
            
            if(data && data > 0) {

                const response = await SpecialityModel.getById(idSpecialite)

                if(response.length > 0){
                    res.status(200).json(...response)    
                } else {
                    res.status(404).json({ error: "No such Speciality "})
                }  
            } else {
                res.status(500).json({ error: " An error occured "})
            }
        } else {
            return res.status(400).json({ error : "Provide all the required data" })
        } 
    }

    /**
     * Deleting a Speciality of the platform using his identifier
     * @param {number} idSpecialite The Speciality's identifier
     * @returns {Object} response of the request
     */
     static deleteSpeciality = async (req, res) => {
        const idSpecialite = parseInt(req.params.idSpecialite)
        
        if(idSpecialite && Number.isInteger(idSpecialite)) {
            const data = await SpecialityModel.delete(idSpecialite)

            if(data > 0) {
                res.status(200).json({ data: idSpecialite })
            } else if(data == 0) {
                res.status(404).json({ message: " The Speciality doesn't exist " })
            } else {
                res.status(500).json({ error: " An error occured "})

            }
        } else {
            res.status(400).json({ error: " Provide all required data " })
        }
    }

    /**
     * Verify the unicity of a speciality
     * @returns Response
     */
     static checkSpeciality = async (req, res) => {

        const { name } = req.body

        if (name) {
            const { data } = await SpecialityModel.checkSpeciality(name)

            if (data !== undefined) {
                return res.status(200).json({ data })
            }

            return res.status(500).json({ error })
        } else {
            res.status(400).json({ error: "Provide all the required data" })
        }
    }
}

export default SpecialityController