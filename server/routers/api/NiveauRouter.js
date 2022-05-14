import express from 'express';
import NiveauController from "../../controllers/NiveauController.js";
import authenticationMiddleware from '../../middlewares/auth.js';

const NiveauRouter = express.Router();


NiveauRouter.post('/create', authenticationMiddleware, NiveauController.createNiveau);
NiveauRouter.get('/all', authenticationMiddleware, NiveauController.findAllNiveau);
// NiveauRouter.get('/:id', NiveauController.getNiveauById);
NiveauRouter.put('/:id', authenticationMiddleware, NiveauController.updateNiveau);
NiveauRouter.delete('/:id', authenticationMiddleware, NiveauController.deleteNiveau);

export default NiveauRouter;

