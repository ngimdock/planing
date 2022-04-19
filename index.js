import express from "express"

//import router
import FacultyRouter from "./routers/api/FacultyRouter"

const app = express()

// use middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use some routes
app.use("/faculty", FacultyRouter)

app.get("/", (req, res) =>  {
	console.log("Welcome to hour planing project")
})

const PORT = process.env.post || 5000
app.listen(POSR, () => console.log(`Runing on port ${PORT}`))