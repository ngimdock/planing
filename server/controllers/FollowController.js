import FollowModel from "../models/FollowModel.js"

class FollowController {

    /**
     * 
     */
    static getFollows = async (req, res) => {
        res.send("This are all Follows")
    }

    /**
     * 
     */
    static createFollow = async (req, res) => {

    }
}

export default FollowController