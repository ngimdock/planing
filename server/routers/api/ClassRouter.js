import express from 'express';
import ClassController from '../../controllers/ClassController.js';

const ClassRouter = express.Router()

ClassRouter.get('/:id', ClassController.getClass)
ClassRouter.get('/all', ClassController.findAllClass)
ClassRouter.post('/create', ClassController.createClass)

export default ClassRouter;





