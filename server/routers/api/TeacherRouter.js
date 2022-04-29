import express from "express";
import TeacherController from "../../controllers/TeacherController.js"

const TeacherRouter = express.Router()

TeacherRouter.get("/", TeacherController.getTeachers)
TeacherRouter.post('/create', TeacherController.createTeacher)
TeacherRouter.patch('/update', TeacherController.updateTeacher)
// TeacherRouter.patch('/delete', TeacherController.updateTeacher)

export default TeacherRouter