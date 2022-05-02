import express from 'express';
import CourseController from "../../controllers/CourseController.js"


const CourseRouter = express.Router()

//set some routes
CourseRouter.get("/", CourseController.getCourses)
CourseRouter.post("/create", CourseController.createCourse)
CourseRouter.post("/verify_code", CourseController.checkCode)

export default CourseRouter