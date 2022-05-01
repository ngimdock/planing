import express from "express";
import GroupController from "../../controllers/GroupController.js"

const GroupRouter = express.Router() 

GroupRouter.get('/', GroupController.getGroups)
GroupRouter.get('/:idGroupe', GroupController.getGroup)
GroupRouter.post('/create', GroupController.createGroup)

export default GroupRouter