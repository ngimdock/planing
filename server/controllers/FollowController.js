import FollowModel from "../models/FollowModel.js"

class FollowController {

    /**
     * 
     */
    static getFollows = async (req, res) => {
        res.send("This are all Follows")
    }

    /**
     * Fetching the groups by their common course on the platform
     * @param {String} codeCours The reference of the course we will use for research 
     * @returns data | error
     */
     static getGroupsByCourse = async (req, res) => {
        const codeCours = req.params.codeCours

        if(codeCours && typeof codeCours === 'string' && codeCours != '') {
            const data = await FollowModel.getByCourse(codeCours)

            if(data.length > 0){
                res.status(200).json(data)    
            } else {
                res.status(404).json({ error: " No such groups "})
            }
        } else {
            res.status(400).json({ error: " Provide all the required data "})
        }
    }
    /**
     * Fetching the courses followed by their common group on the platform
     * @param {String} idGroupe The reference of the group we will use for research 
     * @returns data | error
     */
     static getCoursesByGroup = async (req, res) => {
        const idGroupe = parseInt(req.params.idGroupe)

        if(idGroupe && Number.isInteger(idGroupe)) {
            const data = await FollowModel.getByGroup(idGroupe)

            if(data.length > 0){
                res.status(200).json(data)    
            } else {
                res.status(404).json({ error: " No such courses "})
            }
        } else {
            res.status(400).json({ error: " Provide all the required data "})
        }
    }

    /**
     * Fetching the new assocation of a group and a course
     * @param {number} idGroupe the reference of the Groupe table
     * @param {String} codeCours the reference of the Cours table
     * @returns {Object} data | error
     */
    static createFollow = async (req, res) => {
        const { 
            idGroupe,
            codeCours
        } = req.body 

        if(idGroupe && codeCours 
            && Number.isInteger(idGroupe) 
            && typeof codeCours === 'string' && codeCours != '') {
                const { response, data} = await FollowModel.create(req.body)

                if(response && response > 0 && data) {
                    res.status(201).json(data)
                } else {
                    res.status(500).json({ error: " An error occured " })
                }
                
        } else {
            res.status(400).json({ error : " Provide all required infos "})
        }
    }

    /**
     * Update a course follow of a group using their identifiers
     * @param {number} idGroupe The reference to the Groupe table
     * @param {String} codeCours The reference to the Groupe table
     * @return {Object} response | error
     */
    static updateFollow = async (req, res) => {
        const {
            currentIdGroupe,
            currentCodeCours
        } = req.params
        
        const {
            idGroupe,
            codeCours
        } = req.body

        if((currentIdGroupe && currentCodeCours 
            && Number.isInteger(parseInt(currentIdGroupe))
            && typeof currentCodeCours === 'string'
            && currentCodeCours != '')
            &&(idGroupe && codeCours 
                && Number.isInteger(parseInt(idGroupe))
                && typeof codeCours === 'string'
                && codeCours != '')) {
                    const { response, newData } = await FollowModel.update(req.params, req.body)

                    if(response > 0 && newData){
                        res.status(200).json(newData)
                    } else {
                        res.status(500).json({ error : " An error occured "})
                    }
        } else {
            res.status(400).json({ error: " Provide all required data " })
        }
    }

    /**
     * Deleting a groupe-course followance on the platform from their references
     * @param {number} idGroupe The group reference
     * @param {String} codeCours The course reference
     * @returns {Object} response | error
     */
     static deleteFollow = async (req, res) => {
        const {
            idGroupe,
            codeCours
        } = req.params
        
        if(idGroupe && codeCours 
            && Number.isInteger(parseInt(idGroupe))
            && typeof codeCours === 'string'
            && codeCours != '') {

            const { response, data } = await FollowModel.delete(req.params)

            if(response && response > 0 && data) {
                res.status(200).json({ message: " The Follow has successfully been deleted " })
            } else if(data == 0) {
                res.status(404).json({ message: " The Follow doesn't exist " })
            } else {
                res.status(500).json({ error: " An error occured "})
            }
        } else {
            res.status(400).json({ error: " Provide all required data " })
        }
    }
}

export default FollowController