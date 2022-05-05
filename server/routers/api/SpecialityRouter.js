import express from "express";
import SpecialityController from "../../controllers/SpecialityController.js"

const SpecialityRouter = express.Router()

SpecialityRouter.get('/all', SpecialityController.getSpecialities)
SpecialityRouter.get('/:idSpecialite', SpecialityController.getSpeciality)
SpecialityRouter.post('/create', SpecialityController.createSpeciality)
SpecialityRouter.put('/update/:idSpecialite', SpecialityController.updateSpeciality)
SpecialityRouter.put('/delete/:idSpecialite', SpecialityController.deleteSpeciality)

export default SpecialityRouter