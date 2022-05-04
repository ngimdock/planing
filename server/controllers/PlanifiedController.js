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

        console.log(data);

        const programByDay =  {
            "Lundi" : this.getProgramByDay(data, "lundi"),
            "Mardi" : this.getProgramByDay(data, "mardi"),
            "Mercredi" : this.getProgramByDay(data, "mercredi"),
            "Jeudi" : this.getProgramByDay(data, "jeudi"),
            "Vendredi" : this.getProgramByDay(data, "vendredi"),
            "Samedi" : this.getProgramByDay(data, "samedi"),
            "Dimanche" : this.getProgramByDay(data, "dimanche")
        }

        console.log(this.getProgramByDay(data, "lundi"));

        if(data) return res.status(201).json({ data: programByDay })

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
            if(program.nomJour.toLowerCase() === day) programByDay.push(program)
        }

        console.log(programByDay);

        return programByDay
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