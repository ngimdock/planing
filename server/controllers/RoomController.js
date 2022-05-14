import RoomModel from "../models/RoomModel.js"

class RoomController {

    static getRooms = async (req, res) => {
       
        const { data, error } = await RoomModel.getRooms()

        if(data) return res.status(200).json({ data })
        return res.status(500).json({ error })
    }

    static getRoom = async (req, res) => {

        const id = Number(req.params.id)
        const { data, error } = await RoomModel.getRoom(id)

        if(data) return res.status(200).json({ data })
        return res.status(400).json({ error })
    }

    static createRoom = async (req, res) => {

        console.log(req.body);

        //get data from body
        const {
            nomSal,
            capaciteSal
        } = req.body

        if(nomSal && capaciteSal){

            //create on db
            
            const { data, error } = await RoomModel.create(req.body)
            
            if(data) return res.status(201).json(data)

            return res.status(500).json({ error })
        }

        return res.status(400).json({ error: "Provide all the riquire data" })
    }

    static updateRoom = async (req, res) => {

        // get id from request
        const id = Number(req.params.id)
        const { nomSalle, capacite } = req.body

        if(id){

            // verify if room exsist
            const { data } = await RoomModel.getRoom(id)

            if(data) {

                //delete room
                const { data: data2, error } = await RoomModel.update({ ...req.body, id })
                if(data2) return res.status(200).json({ data: "Room was updated on successfully" })
                return res.status(400).json({ error })
            }

            return res.status(400).json({ data: "The room with the given id doest not exist" })
        }

        return res.status(400).json({ error: "Provide all the riquire data" })
    }

    static deleteRoom = async (req, res) => {

        // get id from request
        const id = Number(req.params.id)

        if(id){

            // verify if room exsist
            const { data } = await RoomModel.getRoom(id)

            if(data) {

                //delete room
                const { data: data2, error } = await RoomModel.delete(id)
                if(data2) return res.status(200).json({ data: "Room was deleted on successfully" })
                return res.status(400).json({ error })
            }

            return res.status(400).json({ data: "The room with the given id doest not exist" })
        }

        return res.status(400).json({ error: "Provide all the riquire data" })
    }
}

export default RoomController