import express from 'express';
import CourseController from "../../controllers/CourseController.js"
import authenticationMiddleware from '../../middlewares/auth.js';


const CourseRouter = express.Router()

//set some routes
CourseRouter.get("/", authenticationMiddleware, CourseController.getCourses)
CourseRouter.get("/available/:idSemester/:codeClasse", authenticationMiddleware, CourseController.getAvailableCourse)
CourseRouter.get("/:codeCours", authenticationMiddleware, CourseController.getCourse)
CourseRouter.post("/create", CourseController.createCourse)
CourseRouter.delete("/delete/:codeCours", authenticationMiddleware, CourseController.deleteCourse)
CourseRouter.put("/update/:codeCours", authenticationMiddleware, CourseController.updateCourse)
CourseRouter.post("/verify_code", authenticationMiddleware, CourseController.checkCode)

export default CourseRouter
