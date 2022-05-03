import express from 'express';
import ClassController from '../../controllers/ClassController.js';

const ClassRouter = express.Router()


ClassRouter.get('/all', ClassController.findAllClass)
ClassRouter.get('/one', ClassController.findById)
ClassRouter.put('/update', ClassController.updateClass)
ClassRouter.put('/update/:id', ClassController.updateGroup)
ClassRouter.delete('/delete', ClassController.deleteClasse)
ClassRouter.post('/create', ClassController.createClass)

export default ClassRouter;





