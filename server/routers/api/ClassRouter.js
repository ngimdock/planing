import express from 'express';
import ClassController from '../../controllers/ClassController.js';
import authenticationMiddleware from '../../middlewares/auth.js';

const ClassRouter = express.Router()

//routes de classes
ClassRouter.get('/all', authenticationMiddleware, ClassController.findAllClass)
ClassRouter.get('/one', authenticationMiddleware, ClassController.findById)
ClassRouter.put('/update', authenticationMiddleware, ClassController.updateClass)
ClassRouter.delete('/delete', authenticationMiddleware, ClassController.deleteClasse)
ClassRouter.post('/create', authenticationMiddleware, ClassController.createClass)

//routes des Groupes
ClassRouter.put('/update/:id', authenticationMiddleware, ClassController.updateGroup)
ClassRouter.delete('/delete/:id', authenticationMiddleware, ClassController.deleteGroup)
// delete a classe_spec
ClassRouter.delete('/classe_spec/delete', authenticationMiddleware, ClassController.deleteClasse_spec)
export default ClassRouter;





