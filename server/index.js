import express from "express"
import cors from 'cors'
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
import GroupRouter from "./routers/api/GroupRouter.js"
import FollowRouter from "./routers/api/FollowRouter.js"
import planifiedRouter from "./routers/api/planifiedRouter.js"

const app = express()

// Cors options
const corsOptions = {
	origin: "*"
}

// use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

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
app.use("/group", GroupRouter)
app.use("/follow", FollowRouter)
app.use("/planified", planifiedRouter)

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
