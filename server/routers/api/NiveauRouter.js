import express from 'express';
import NiveauController from "../../controllers/NiveauController.js";

const NiveauRouter = express.Router();


NiveauRouter.post('/create', NiveauController.createNiveau);
NiveauRouter.get('/all', NiveauController.findAllNiveau);
// NiveauRouter.get('/:id', NiveauController.getNiveauById);
NiveauRouter.put('/:id', NiveauController.updateNiveau);
NiveauRouter.delete('/:id', NiveauController.deleteNiveau);

export default NiveauRouter;

