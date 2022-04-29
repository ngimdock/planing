import express from "express";
import TeacherController from "../../controllers/TeacherController.js"

const TeacherRouter = express.Router()

TeacherRouter.get("/", TeacherController.getTeachers)
TeacherRouter.post('/create', TeacherController.createTeacher)

export default TeacherRouter