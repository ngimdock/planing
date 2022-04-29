import express from 'express';
import NiveauController from "../../controllers/NiveauController.js";

const NiveauRouter = express.Router();

NiveauRouter.get('/all', NiveauController.getNiveau);
NiveauRouter.post('/create', NiveauController.createNiveau)

export default NiveauRouter;

