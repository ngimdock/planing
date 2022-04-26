import express from "express"

//import router
import FacultyRouter from "./routers/api/FacultyRouter.js"
import AdminRouter from './routers/api/AdminRouter.js'
import { initializeDB } from "./models/init.js"
import AdminModel from "./models/AdminModel.js"

const app = express()

// use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use some routes
app.use("/faculty", FacultyRouter)
app.use("/admin", AdminRouter)

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

	const res = await AdminModel.verifyEmail("dilane@gmail.com")
	console.log({res})
})
