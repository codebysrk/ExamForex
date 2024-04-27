import express from "express";
import adminController from "../controller/adminController.js";

const router = express.Router();
// Route to login admin
router.post("/admin/login", adminController.loginAdmin);

// Route to create a new admin
router.post("/admin", adminController.createAdmin);

// Route to get all admins
router.get("/admin", adminController.getAllAdmins);

// Route to get admin by ID
router.get("/admin/:id", adminController.getAdminById);

// Route to update admin by ID
router.put("/admin/:id", adminController.updateAdminById);

// Route to delete admin by ID
router.delete("/admin/:id", adminController.deleteAdminById);

export default router;
