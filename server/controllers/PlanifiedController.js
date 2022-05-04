import PlanifiedModel from "../models/PlanifiedModel.js"

class PlanifiedController {

    /**
     * Handle the request to get all programs on database
     * @param {object} req 
     * @param {Object} res 
     * @returns {object} data or error
     */
    static getPrograms = async (req, res) => {

        const { data, error } = await PlanifiedModel.getPrograms()

        if(data) return res.status(201).json({ data })

        return res.status(500).json({ error })
    }

    static createProgram = async (req, res) => {

        //extract data from request body
        const {
            idAdmin,
            codeCours,
            idSalle,
            idJour,
            heureDebut,
            heureFin
        } = req.body

        const checkData = (idAdmin && codeCours && idSalle && idJour &&  heureDebut && heureFin) ? true : false

        if(!checkData) return res.status(400).json({ error: "Provide all informations datas to create the course" })

        const { data, error } = await PlanifiedModel.createProgram(req.body)

        if(data) return res.status(201).json({ data })
        return res.status(500).json({ error })
    }
}

export default PlanifiedController