import express from 'express';
import CourseController from "../../controllers/CourseController.js"


const CourseRouter = express.Router()

//set some routes
CourseRouter.get("/", CourseController.getCourses)
CourseRouter.get("/:codeCours", CourseController.getCourse)
CourseRouter.post("/create", CourseController.createCourse)
CourseRouter.delete("/delete/:codeCours", CourseController.deleteCourse)
CourseRouter.patch("/update/:codeCours", CourseController.updateCourse)

export default CourseRouter