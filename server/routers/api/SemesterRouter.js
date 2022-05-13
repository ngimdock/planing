import express from "express";
import SemesterController from "../../controllers/SemesterController.js";
import authenticationMiddleware from "../../middlewares/auth.js";

const SemesterRouter = express.Router()

//set some routes
SemesterRouter.get("/all", authenticationMiddleware, SemesterController.findAll)
SemesterRouter.post("/create", authenticationMiddleware, SemesterController.create)
SemesterRouter.patch("/:id", authenticationMiddleware, SemesterController.update)

export default SemesterRouter