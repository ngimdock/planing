import express from "express"
import FacultyModel from "./models/FacultyModel.js"
import TeacherModel from "./models/TeacherModel.js"

//import router
import FacultyRouter from "./routers/api/FacultyRouter.js"
import TeacherRouter from "./routers/api/TeacherRouter.js"

const app = express()

// use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use some routes
app.use("/faculty", FacultyRouter)
app.use("/teacher", TeacherRouter)

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
app.listen(PORT, () => {
	console.log(`Runing on port ${PORT}`)

	FacultyModel.init()
	TeacherModel.init()
})