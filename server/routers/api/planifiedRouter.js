import express from 'express';
import PlanifiedController from "../../controllers/PlanifiedController.js"


const planifiedRouter = express.Router()

//set some routes
planifiedRouter.get("/:idAnneeAca/:idSemestre", PlanifiedController.getAllPrograms)
planifiedRouter.post("/create", PlanifiedController.createProgram)
planifiedRouter.delete("/delete/", PlanifiedController.deleteProgram)
planifiedRouter.patch("/update/", PlanifiedController.updateProgram)

export default planifiedRouter