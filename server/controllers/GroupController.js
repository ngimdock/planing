import GroupModel from "../models/GroupModel.js"

class GroupController {

    /**
     * 
     */
    static getGroups = async (req, res) => {
        res.send("This are all Groups")
    }

    /**
     * 
     */
    static createGroup = async (req, res) => {

    }
}

export default GroupController