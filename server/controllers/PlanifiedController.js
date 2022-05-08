import PlanifiedModel from "../models/PlanifiedModel.js"

class PlanifiedController {

    /**
     * Handle the request to get all programs on database
     * @param {object} req 
     * @param {Object} res 
     * @returns {object} data or error
     */
    static getAllPrograms = async (req, res) => {

        const { idAnneeAca, idSemestre } = req.params

        if(!idAnneeAca || !idSemestre) return res.status(400).json({ error: "Provide all required data" })

        const { data, error } = await PlanifiedModel.getAllPrograms({ idAnneeAca: Number(idAnneeAca), idSemestre: Number(idSemestre) })

        if(data){
            return res.status(201).json({ data })
        }

        return res.status(500).json({ error })
    }

    static getProgramsByFaculty = async (req, res) => {
        const {
            idAnneeAca,
            idSemestre,
            idFiliere
        } = req.params

        if (idAnneeAca && idSemestre && idFiliere) {
            const { data, error } = await PlanifiedModel.getProgramsByFaculty(req.params)

            if (data) {
                return res.json({ data })
            }

            return res.status(500).json({ error })
        } else {
            return res.status(400).json({ error: "Provide all the required data" })
        }
    }

    static getProgramByClass = async (req, res) => {

        const {
            idAnneeAca,
            idSemestre,
            codeClasse
        } = req.params

        if(!idAnneeAca || !idSemestre || !codeClasse) 
            return res.status(400).json({ error: "Provide all the required data" })
        
        const { data, error } = await PlanifiedModel.getProgramByclass(req.params)

        if(data) return res.status(201).json({ data })

        return res.status(500).json({ error })
    }

    /**
     * Create program 
     * @param {Object} req request
     * @param {Object} res response
     * @returns {Object} message or error
     */
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

    // static getProgram = async (req, res) => {
    //     const { 
    //         idAdmin, 
    //         codeCours, 
    //         idSalle, 
    //         idJour, 
    //         heureDebut
    //     } = req.body

    //     const checkData = (idAdmin && codeCours, idSalle && idJour, heureDebut) ? true : false

    //     if(!checkData) return res.status(400).json({ error: "Provide all the required data to get this program" })

    //     //delete program
    //     const { data, error } = await PlanifiedModel.getProgram(req.body)

    //     if(data) return res.status(200).json({ data })
    //     return res.status(404).json({ error })
    // }

    static deleteProgram = async (req, res) => {

        const { 
            idAdmin, 
            codeCours, 
            idSalle, 
            idJour, 
            heureDebut
        } = req.body

        const checkData = (idAdmin && codeCours && idSalle && idJour && heureDebut ) ? true : false

        if(!checkData) return res.status(400).json({ error: "Provide all the required data to delete this program" })

        //delete program
        const { data, error } = await PlanifiedModel.deleteProgram(req.body)

        if(data) return res.status(200).json({ data })
        return res.status(500).json({ error })
    }

    static updateProgram = async (req, res) => {
        const { 
            idAdmin, 
            codeCours, 
            idSalle, 
            idJour, 
            heureDebut
        } = req.body.key

        const {
            newHeureDebut,
            newHeureFin
        } = req.body.data

        const newData = req.body.data

        console.log(req.body.data);

        // console.log(newData.keys())

        const checkData = (idAdmin && codeCours && idSalle && idJour && heureDebut && req.body.data) ? true : false

        if(!checkData) return res.status(400).json({ error: "Provide all the required data to update this program" })

        //delete program
        const { data, error } = await PlanifiedModel.updateProgram(req.body)

        if(data) return res.status(200).json({ data })
        return res.status(500).json({ error })

    }

    /**
     * Take all programs and a specifik day and return array of programs that match with the given day
     * @param {Object} allPrograms all program data 
     * @param {String} day specifik day
     * @returns {Array} array of programs which have the specifik day
     */
     static getProgramByDay = (allPrograms, day) => {

        const programByDay = []

        for(let program of allPrograms){
            if(program.nomJour.toLowerCase() === day.toLocaleLowerCase()) programByDay.push(program)
        }

        return programByDay
    }

    
    
}

export default PlanifiedController