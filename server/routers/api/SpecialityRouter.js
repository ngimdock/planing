import express from "express";
import SpecialityController from "../../controllers/SpecialityController.js"

const SpecialityRouter = express.Router()

SpecialityRouter.get('/', SpecialityController.getSpecialities)
SpecialityRouter.post('/create', SpecialityController.createSpeciality)

export default SpecialityRouter