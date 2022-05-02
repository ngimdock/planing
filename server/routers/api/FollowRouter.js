import express from "express";
import FollowController from "../../controllers/FollowController.js"

const FollowRouter = express.Router()

FollowRouter.get('/groups/:codeCours', FollowController.getGroupsByCourse)
FollowRouter.post('/create', FollowController.createFollow)
FollowRouter.put('/update/:currentIdGroupe&:currentCodeCours', FollowController.updateFollow)
FollowRouter.delete('/delete/:idGroupe&:codeCours', FollowController.deleteFollow)
export default FollowRouter