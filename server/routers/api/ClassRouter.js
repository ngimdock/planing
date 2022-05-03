import express from 'express';
import ClassController from '../../controllers/ClassController.js';

const ClassRouter = express.Router()

//routes de classes
ClassRouter.get('/all', ClassController.findAllClass)
ClassRouter.get('/one', ClassController.findById)
ClassRouter.put('/update', ClassController.updateClass)
ClassRouter.delete('/delete', ClassController.deleteClasse)
ClassRouter.post('/create', ClassController.createClass)

//routes des Groupes
ClassRouter.put('/update/:id', ClassController.updateGroup)
ClassRouter.delete('/delete/:id', ClassController.deleteGroup)
export default ClassRouter;





