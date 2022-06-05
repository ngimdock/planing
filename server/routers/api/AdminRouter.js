import express from "express";
import AdminController from "../../controllers/AdminController.js";
import authenticationMiddleware from "../../middlewares/auth.js";

const AdminRouter = express.Router();

// Some routes
AdminRouter.get(
  "/current",
  authenticationMiddleware,
  AdminController.getCurrentUser
);
AdminRouter.get("/all", authenticationMiddleware, AdminController.getAll);
AdminRouter.post("/create", authenticationMiddleware, AdminController.create);
AdminRouter.post("/signin", AdminController.signin);
AdminRouter.post(
  "/verify_email",
  authenticationMiddleware,
  AdminController.checkAdminExist
);

export default AdminRouter;
