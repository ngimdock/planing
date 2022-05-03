import express from "express";
import TeacherController from "../../controllers/TeacherController.js"

const TeacherRouter = express.Router()

TeacherRouter.get("/", TeacherController.getTeachers)
TeacherRouter.get("/:matriculeEns", TeacherController.getTeacher)
TeacherRouter.post('/create', TeacherController.createTeacher)
TeacherRouter.put('/update/:currentMatriculeEns', TeacherController.updateTeacher)
TeacherRouter.delete('/delete/:matriculeEns', TeacherController.deleteTeacher)

export default TeacherRouter