import express from "express";
import GroupController from "../../controllers/GroupController.js"
import authenticationMiddleware from "../../middlewares/auth.js";

const GroupRouter = express.Router() 

GroupRouter.get('/', authenticationMiddleware,  GroupController.getGroups)
GroupRouter.get('/:idGroupe', authenticationMiddleware,  GroupController.getGroup)
GroupRouter.post('/create', authenticationMiddleware,  GroupController.createGroup)
GroupRouter.put('/update/:idGroupe', authenticationMiddleware,  GroupController.updateGroup)
GroupRouter.delete('/delete/:idGroupe', authenticationMiddleware, GroupController.deleteGroup)

export default GroupRouter