import express from "express";
import RoomController from "../../controllers/RoomController.js"
import authenticationMiddleware from "../../middlewares/auth.js";

const RoomRouter = express.Router()

//set some routes
 RoomRouter.get("/all", authenticationMiddleware, RoomController.getRooms)
 RoomRouter.get("/:id", authenticationMiddleware, RoomController.getRoom)
 RoomRouter.post("/create", authenticationMiddleware, RoomController.createRoom)
 RoomRouter.patch("/update/:id", authenticationMiddleware, RoomController.updateRoom)
 RoomRouter.delete("/delete/:id", authenticationMiddleware, RoomController.deleteRoom)

 export default RoomRouter