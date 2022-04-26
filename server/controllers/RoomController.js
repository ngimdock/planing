import RoomModel from "../models/RoomModel.js"

class RoomController {

    static createRoom = async (req, res) => {

        //get data from body
        const {
            nomSal,
            capacite
        } = req.body

        if(nomSal && capacite){

            //create on db
            const { data, error } = await RoomModel.create(req.body)

            if(data) return res.status(201).json("Room was created on successfully")

            return res.status(500).json({ error })
        }

        return res.status(400).json({ error: "Provide all the riquire data" })
    }
}

export default RoomController