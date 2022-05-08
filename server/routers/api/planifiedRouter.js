import express from 'express';
import PlanifiedController from "../../controllers/PlanifiedController.js"


const planifiedRouter = express.Router()

//set some routes/filier
planifiedRouter.get("/:idAnneeAca/:idSemestre", PlanifiedController.getAllPrograms)
planifiedRouter.get("/filiere/:idAnneeAca/:idSemestre/:idFiliere", PlanifiedController.getProgramsByFaculty)
planifiedRouter.get("/classe/:idAnneeAca/:idSemestre/:codeClasse", PlanifiedController.getProgramByClass)
planifiedRouter.get("/teacher/:idAnneeAca/:idSemestre/:matriculeEns", PlanifiedController.getProgramByTeacher)
planifiedRouter.get("/room/:idAnneeAca/:idSemestre/:idSalle", PlanifiedController.getProgramByRoom)
planifiedRouter.post("/create", PlanifiedController.createProgram)
planifiedRouter.delete("/delete/", PlanifiedController.deleteProgram)
planifiedRouter.patch("/update/", PlanifiedController.updateProgram)

export default planifiedRouter