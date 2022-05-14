import express from 'express';
import ClassController from '../../controllers/ClassController.js';
import authenticationMiddleware from '../../middlewares/auth.js';

const ClassRouter = express.Router()

//routes de classes
ClassRouter.get('/all', ClassController.findAllClass)
ClassRouter.get('/one', ClassController.findById)
ClassRouter.put('/update', ClassController.updateClass)
ClassRouter.delete('/delete/:codeClasse', ClassController.deleteClasse)
ClassRouter.post('/create', ClassController.createClass)

//routes des Groupes
ClassRouter.put('/update/:id', authenticationMiddleware, ClassController.updateGroup)
ClassRouter.delete('/delete/:id', authenticationMiddleware, ClassController.deleteGroup)
// delete a classe_spec
ClassRouter.delete('/classe_spec/delete', authenticationMiddleware, ClassController.deleteClasse_spec)
export default ClassRouter;





