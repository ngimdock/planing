import express from 'express';
import ClassController from '../../controllers/ClassController.js';

const ClassRouter = express.Router()


ClassRouter.get('/all', ClassController.findAllClass)
ClassRouter.get('/:id', ClassController.getClass)
ClassRouter.post('/create', ClassController.createClass)

export default ClassRouter;





