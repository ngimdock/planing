import express from "express";
import TeacherController from "../../controllers/TeacherController.js"
import authenticationMiddleware from '../../middlewares/auth.js'

const TeacherRouter = express.Router()

TeacherRouter.get("/", authenticationMiddleware,  TeacherController.getTeachers)
TeacherRouter.get("/available/", authenticationMiddleware, TeacherController.getAvailableTeachers)
TeacherRouter.get("/:matriculeEns", authenticationMiddleware, TeacherController.getTeacher)
TeacherRouter.post('/create', authenticationMiddleware, TeacherController.createTeacher)
TeacherRouter.post('/verify_matricule', authenticationMiddleware, TeacherController.checkMatricule)
TeacherRouter.put('/update/:currentMatriculeEns', authenticationMiddleware, TeacherController.updateTeacher)
TeacherRouter.delete('/delete/:matriculeEns', authenticationMiddleware, TeacherController.deleteTeacher)

export default TeacherRouter