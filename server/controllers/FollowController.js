import FollowModel from "../models/FollowModel.js"

class FollowController {

    /**
     * 
     */
    static getFollows = async (req, res) => {
        res.send("This are all Follows")
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
                const data = await FollowModel.create(req.body)

                if(data) {
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

            const { response, data} = await FollowModel.delete(req.params)

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