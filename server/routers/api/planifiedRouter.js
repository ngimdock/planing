import express from 'express';
import PlanifiedController from "../../controllers/PlanifiedController.js"


const planifiedRouter = express.Router()

//set some routes
planifiedRouter.get("/", PlanifiedController.getPrograms)

export default planifiedRouter