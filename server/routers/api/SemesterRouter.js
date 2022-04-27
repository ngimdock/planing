import express from "express";
import SemesterController from "../../controllers/SemesterController.js";

const SemesterRouter = express.Router()

//set some routes
SemesterRouter.get("/all", SemesterController.findAll)
SemesterRouter.post("/create", SemesterController.create)
SemesterRouter.patch("/:id", SemesterController.update)

export default SemesterRouter