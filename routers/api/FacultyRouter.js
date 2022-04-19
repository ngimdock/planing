import express from "express"
import FacultyController from "../../controllers/FacultyController"

FacultyRouter = express.router()

// set some routes
FacultyRouter.get("/all", FacultyController.getFaculties)
FacultyRouter.post("/create", FacultyController.createFaculty)

export default FacultyRouter