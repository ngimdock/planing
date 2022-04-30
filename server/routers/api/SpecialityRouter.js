import express from "express";
import SpecialityController from "../../controllers/SpecialityController.js"

const SpecialityRouter = express.Router()

SpecialityRouter.get('/', SpecialityController.getSpecialities)
SpecialityRouter.get('/:idSpecialite', SpecialityController.getSpeciality)
SpecialityRouter.post('/create', SpecialityController.createSpeciality)
SpecialityRouter.put('/update/:idSpecialite', SpecialityController.updateSpeciality)

export default SpecialityRouter