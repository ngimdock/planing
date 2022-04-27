import express from "express";
import RoomController from "../../controllers/RoomController.js"

const RoomRouter = express.Router()

//set some routes
 RoomRouter.get("/all", RoomController.getRooms)
 RoomRouter.get("/:id", RoomController.getRoom)
 RoomRouter.post("/create", RoomController.createRoom)
 RoomRouter.patch("/update/:id", RoomController.updateRoom)
 RoomRouter.delete("/delete/:id", RoomController.deleteRoom)

 export default RoomRouter