import express from 'express';
import PlanifiedController from "../../controllers/PlanifiedController.js"
import authenticationMiddleware from '../../middlewares/auth.js';


const planifiedRouter = express.Router()

//set some routes
planifiedRouter.get("/:idAnneeAca/:idSemestre", authenticationMiddleware, PlanifiedController.getAllPrograms)
planifiedRouter.get("/:idAnneeAca/:idSemestre/:idFiliere", authenticationMiddleware, PlanifiedController.getProgramsByFaculty)
planifiedRouter.post("/create", authenticationMiddleware, PlanifiedController.createProgram)
planifiedRouter.delete("/delete/", authenticationMiddleware, PlanifiedController.deleteProgram)
planifiedRouter.patch("/update/", authenticationMiddleware, PlanifiedController.updateProgram)

export default planifiedRouter