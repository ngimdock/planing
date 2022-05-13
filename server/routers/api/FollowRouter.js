import express from "express";
import FollowController from "../../controllers/FollowController.js"
import authenticationMiddleware from "../../middlewares/auth.js";

const FollowRouter = express.Router()

FollowRouter.get('/groups/:codeCours', authenticationMiddleware, FollowController.getGroupsByCourse)
FollowRouter.get('/courses/:idGroupe', authenticationMiddleware, FollowController.getCoursesByGroup)
FollowRouter.post('/create', authenticationMiddleware, FollowController.createFollow)
FollowRouter.put('/update/:currentIdGroupe&:currentCodeCours', authenticationMiddleware, FollowController.updateFollow)
FollowRouter.delete('/delete/:idGroupe&:codeCours', authenticationMiddleware, FollowController.deleteFollow)
export default FollowRouter