import GroupModel from "../models/GroupModel.js"

class GroupController {

    /**
     * Fetching all the groups of the platform
     * @param {null} null no parameters required for this 
     * @returns {Object} data | error
     */
    static getGroups = async (req, res) => {
        const data = await GroupModel.get()

        if(data) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ error: " An error occured " })
        }
    }

    /**
     * Fetching a group with his identifier
     * @param {number} idGroupe the identifier of the searched group
     * @return {Object} data | error
     */
    static getGroup = async (req, res) => {
        const idGroupe = parseInt(req.params.idGroupe)

        if(idGroupe && Number.isInteger(idGroupe)) {
            const data = await GroupModel.getById(idGroupe)

            if(data) {
                res.status(200).json(data)
            } else {
                res.status(500).json({ error : " An error occured "})
            }
        } else {
            res.status(400).json({ error: " Provide all required data "})
        }
    }

    /**
     * Fetching the new created groupe
     * @param {String} nomGroupe The name of the group 
     * @param {number} capaciteGroupe The capacity of the group 
     * @param {String} codeClasse The reference to the Classe table primary Key 
     * @param {number} idSpecialite The reference to the Speciality table primary key
     * @returns {Object} data | error
     */
    static createGroup = async (req, res) => {
        const {
            nomGroupe,
            capaciteGroupe,
            codeClasse,
            idSpecialite
        } = req.body

        if(nomGroupe && capaciteGroupe && codeClasse && idSpecialite 
            && (nomGroupe != '' && codeClasse != '' && typeof nomGroupe === 'string' && typeof codeClasse === 'string')
            && (Number.isInteger(capaciteGroupe) && Number.isInteger(idSpecialite))) {
            
            const data = await GroupModel.create(req.body)
            
            if(data > 0) {
                res.status(201).json({ message: " The Groupe has successfully been created "})
            } else {
                res.status(500).json({ error: " An error occured "})
            }

        } else {
            res.status(400).json({ error : " Provide all the required data "})
        }
    }

    /**
     * Fetchinh the new created group infos
     * @param {number} idGroupe The identifier of the updated group
     * @param {String} nomGroupe The name of the group 
     * @param {number} capaciteGroupe The capacity of the group 
     * @param {String} codeClasse The reference to the Classe table primary Key 
     * @param {number} idSpecialite The reference to the Speciality table primary key
     * @returns {Object} data | error
     */
    static updateGroup = async (req, res) => {
        const {
            nomGroupe,
            capaciteGroupe,
            codeClasse,
            idSpecialite
        } = req.body

        const idGroupe = parseInt(req.params.idGroupe)

        if(nomGroupe && capaciteGroupe && codeClasse && idSpecialite && idGroupe
            && (nomGroupe != '' && codeClasse != '' && typeof nomGroupe === 'string' && typeof codeClasse === 'string')
            && (Number.isInteger(capaciteGroupe) && Number.isInteger(idSpecialite) && Number.isInteger(idGroupe))) {
            const data = await GroupModel.update(req.body, idGroupe)

            if(data && data > 0) {

                const response = await GroupModel.getById(idGroupe)

                if(response.length > 0){
                    res.status(200).json(response)    
                } else {
                    res.status(404).json({ error: "No such group "})
                }  
            } else {
                res.status(500).json({ error: " An error occured "})
            }
        } else {
            res.status(400).json({ error : " Provide all required data " })
        }

    }

}

export default GroupController