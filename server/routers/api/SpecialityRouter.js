import express from "express";
import SpecialityController from "../../controllers/SpecialityController.js"
import authenticationMiddleware from '../../middlewares/auth.js'

const SpecialityRouter = express.Router()

SpecialityRouter.get('/all', /*authenticationMiddleware,*/ SpecialityController.getSpecialities)
SpecialityRouter.get('/:idSpecialite', SpecialityController.getSpeciality)
SpecialityRouter.post('/create', SpecialityController.createSpeciality)
SpecialityRouter.put('/update/:idSpecialite', SpecialityController.updateSpeciality)
SpecialityRouter.delete('/delete/:idSpecialite', SpecialityController.deleteSpeciality)

export default SpecialityRouter