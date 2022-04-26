import express from "express";
import RoomController from "../../controllers/RoomController.js"

const RoomRouter = express.Router()


 RoomRouter.post("/create", RoomController.createRoom)

 export default RoomRouter