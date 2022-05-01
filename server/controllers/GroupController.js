import GroupModel from "../models/GroupModel.js"

class GroupController {

    /**
     * @param {String} nomGroupe The name of the group 
     * @param {number} capaciteGroupe The capacity of the group 
     * @param {String} codeClasse The reference to the Classe table primary Key 
     * @param {number} idSpecialite The reference to the Speciality table primary key
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

}

export default GroupController