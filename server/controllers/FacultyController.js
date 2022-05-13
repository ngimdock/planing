import FacultyModel from "../models/FacultyModel.js"

class FacultyController {
   /*
	static getFaculties = async (req, res) => {
		const { data, error } = await FacultyModel.findAll()

		if (data) return res.json({ data })

		return res.status(500).json({ error })
	}
	
	static createFaculty = async (req, res) => {
		console.log(req.body)

		const { data } = await FacultyModel.create(req.body)
		
		if(data)
			return res.status(201).json({data})
		return res.status(500).json({ error: "an error occured" })
	}

	static updateFaculty = async (req, res) => {
		const { nomFil } = req.body
		const { idFil } = req.params

		if (nomFil && idFil) {
			const { data, error } = await FacultyModel.update({ nomFil, idFil })

			if (data) {
				return res.json({ data })
			}

			return res.status(500).json({ error })
		}

		return res.status(400).json({ error: "Provide all the required data" })
	}
	*/
	 /**
     * Fetching all the specialities of the platform
     * @param {null}
     * @returns Object data | error
     */
	  static getFaculties = async (req, res) => {
        const { data } = await FacultyModel.findAll()

        if (data !== undefined) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ error : " An error occured " })
        }
    }

    /**
     * Fetching the researched faculty from the platform
     * @param {String} idFil The identifier of the faculty we are searching for 
     * @returns data | error
     */
     static getFaculty = async (req, res) => {
        const idFil= parseInt(req.params.idFil)

        if(idFil && Number.isInteger(idFil)) {
            const data = await FacultyModel.getById(idFil)

            if(data.length > 0){
                res.status(200).json(data)    
            } else {
                res.status(404).json({ error: " No such faculty "})
            }
        } else {
            res.status(400).json({ error: " Provide all the required data "})
        }
    }

    /**
     * Fetching the newly created faculty 
     * @param {String} nomFil The name of the faculty
     * @returns {Object} data | error
     */
    static createFaculty= async (req, res) => {
        const {
            nomFil
        } = req.body

        if(nomFil && typeof nomFil === 'string' && nomFil != '') {

            const { data } = await FacultyModel.create(req.body)

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
     * @param {String} idFil The identifier of the Faculty we are searching for 
     * @returns {Object} data | error
     */
     static updateFaculty = async (req, res) =>  {
        const {
            nomFil,
        } = req.body

        const idFil = parseInt(req.params.idFil)
        
        if(nomFil && idFil
             && typeof nomFil === 'string', nomFil != '' 
             && Number.isInteger(idFil)) {

            const data = await FacultyModel.update(idFil, nomFil)
            
            if(data && data > 0) {

                const {data} = await FacultyModel.getById(idFil)

                if(data.length > 0){
                    res.status(200).json(...data)    
                } else {
                    res.status(404).json({ error: "No such Faculty "})
                }  
            } else {
                res.status(500).json({ error: " An error occured "})
            }
        } else {
            return res.status(400).json({ error : "Provide all the required data" })
        } 
    }

    /**
     * Deleting a Faculty of the platform using his identifier
     * @param {number} idFil The Faculty's identifier
     * @returns {Object} response of the request
     */
     static deleteFaculty = async (req, res) => {
        const idFil = parseInt(req.params.idFil)
        
        if(idFil && Number.isInteger(idFil)) {
            const data = await FacultyModel.delete(idFil)

            if(data > 0) {
                res.status(200).json(idFil)
            } else if(data == 0) {
                res.status(404).json({ message: " The Faculty doesn't exist " })
            } else {
                res.status(500).json({ error: " An error occured "})

            }
        } else {
            res.status(400).json({ error: " Provide all required data " })
        }
    }
}

export default FacultyController