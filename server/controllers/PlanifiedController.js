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
            return res.status(200).json({ data })
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

        console.log(req.params)

        if(!idAnneeAca || !idSemestre || !codeClasse) 
            return res.status(400).json({ error: "Provide all the required data" })
        
        const { data, error } = await PlanifiedModel.getProgramByclass(req.params)

        if(data !== undefined) return res.status(200).json({ data })

        return res.status(500).json({ error })
    }

    /**
     * The controler witch get the specifik teacher's program
     * @param {Object} req 
     * @param {Object} res 
     * @returns data | error
     */
    static getProgramByTeacher = async (req, res) => {

        const {
            idAnneeAca,
            idSemestre,
            matriculeEns
        } = req.params


        if(!idAnneeAca || !idSemestre || !matriculeEns) 
            return res.status(400).json({ error: "Provide all the required data" })
        
        const { data, error } = await PlanifiedModel.getProgramByTeacher(req.params)

        if(data) return res.status(201).json({ data })

        return res.status(500).json({ error })
    }

    /**
     * The controler witch get the specifik classe's program
     * @param {Object} req 
     * @param {Object} res 
     * @returns data of programs | error
     */
    static getProgramByRoom = async (req, res) => {
        const {
            idAnneeAca,
            idSemestre,
            idSalle
        } = req.params

        console.log({ idAnneeAca, idSalle, idSemestre })


        if(!idAnneeAca || !idSemestre || !idSalle) 
            return res.status(400).json({ error: "Provide all the required data" })
        
        const { data, error } = await PlanifiedModel.getProgramByRoom(req.params)

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
            idGroupe,
            idJour,
            matriculeEns,
            idSemestre,
            heureDebut,
            heureFin
        } = req.body

        console.log(req.body)

        const checkData = (
            idAdmin && 
            codeCours && 
            idSalle && 
            idGroupe &&
            idJour &&  
            heureDebut && 
            heureFin &&
            matriculeEns &&
            idSemestre    
        ) ? true : false

        if(!checkData) return res.status(400).json({ error: "Provide all informations datas to create the course" })

        const { data, error } = await PlanifiedModel.createProgram(req.body)

        if(data) return res.status(201).json({ data })
        return res.status(500).json({ error })
    }

    static deleteProgram = async (req, res) => {

        const {
            codeCours, 
            idSalle, 
            idJour, 
            matriculeEns, 
            idSemestre,
            heureDebut
        } = req.query

        console.log(9)

        const checkData = (codeCours && idSalle && idJour && matriculeEns && idSemestre && heureDebut ) ? true : false

        if(!checkData) return res.status(400).json({ error: "Provide all the required data to delete this program" })

        //delete program
        const { data, error } = await PlanifiedModel.deleteProgram(req.query)

        if(data) return res.status(200).json({ data })
        return res.status(500).json({ error })
    }

    static updateProgram = async (req, res) => {
        const { 
            idAdmin, 
            codeCours, 
            idSalle, 
            idJour, 
            matriculeEns, 
            idSemestre,
            heureDebut
        } = req.body.key

        const {
            newHeureDebut,
            newHeureFin
        } = req.body.data

        const newData = req.body.data

        console.log(req.body.data);

        // console.log(newData.keys())

        const checkData = (idAdmin && codeCours && idSalle && idJour && matriculeEns && idSemestre && heureDebut && req.body.data) ? true : false

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