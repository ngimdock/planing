import express from 'express';
import PlanifiedController from "../../controllers/PlanifiedController.js"
import authenticationMiddleware from '../../middlewares/auth.js';


const planifiedRouter = express.Router()

//set some routes
planifiedRouter.get("/:idAnneeAca/:idSemestre", authenticationMiddleware, PlanifiedController.getAllPrograms)
planifiedRouter.post("/create", authenticationMiddleware, PlanifiedController.createProgram)
planifiedRouter.delete("/delete/", authenticationMiddleware, PlanifiedController.deleteProgram)
planifiedRouter.patch("/update/", authenticationMiddleware, PlanifiedController.updateProgram)
//set some routes/filier
planifiedRouter.get("/filiere/:idAnneeAca/:idSemestre/:idFiliere", authenticationMiddleware, PlanifiedController.getProgramsByFaculty)
planifiedRouter.get("/classe/:idAnneeAca/:idSemestre/:codeClasse", authenticationMiddleware, PlanifiedController.getProgramByClass)
planifiedRouter.get("/teacher/:idAnneeAca/:idSemestre/:matriculeEns", authenticationMiddleware, PlanifiedController.getProgramByTeacher)
planifiedRouter.get("/room/:idAnneeAca/:idSemestre/:idSalle", authenticationMiddleware, PlanifiedController.getProgramByRoom)

export default planifiedRouter