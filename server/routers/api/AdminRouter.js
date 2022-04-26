import express from 'express'
import AdminController from '../../controllers/AdminController.js'

const AdminRouter = express.Router()

// Some routes
AdminRouter.get("/current", AdminController.getCurrentUser)
AdminRouter.post("/create", AdminController.create)
AdminRouter.post("/signin", AdminController.signin)
AdminRouter.post("/verify_email", AdminController.checkAdminExist)

export default AdminRouter