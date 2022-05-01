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
                    res.status(200).json(data)
                } else {
                    res.status(500).json({ error: " An error occured " })
                }
                
        } else {
            res.status(400).json({ error : " Provide all required infos "})
        }


    }
}

export default FollowController