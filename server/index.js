import express from "express"
import { initializeDB } from "./models/init.js"

//import router
import FacultyRouter from "./routers/api/FacultyRouter.js"
import AdminRouter from './routers/api/AdminRouter.js'
import NiveauRouter from "./routers/api/NiveauRouter.js"
import ClassRouter from "./routers/api/ClassRouter.js"
import CourseRouter from './routers/api/CourseRouter.js'
import RoomRouter from './routers/api/RoomRouter.js';
import SemesterRouter from "./routers/api/SemesterRouter.js"
import TeacherRouter from "./routers/api/TeacherRouter.js"
import SpecialityRouter from "./routers/api/SpecialityRouter.js"

const app = express()

// use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use some routes
app.use("/faculty", FacultyRouter)
app.use("/admin", AdminRouter)
app.use("/level", NiveauRouter)
app.use("/class", ClassRouter)
app.use("/course", CourseRouter)
app.use("/room", RoomRouter)
app.use("/semester", SemesterRouter)
app.use("/teacher", TeacherRouter)
app.use("/speciality", SpecialityRouter)

app.get("/", (req, res) =>  {
	res.send([{
		name: "blondelle",
		age: 20
	 },
	 {
		name: "dilane",
		age: 20
	 }
	])
})

const PORT = process.env.post || 5000
app.listen(PORT, async () => {
	console.log(`Runing on port ${PORT}`)

	// Creation of tables in DB
	initializeDB()
})
