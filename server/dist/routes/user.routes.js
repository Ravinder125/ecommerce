import { Router } from "express";
import { registerUser, } from "../controllers/user.controller.js";
const router = Router();
// Routes
router.post("/register", registerUser);
// router.post("/login")
export default router;
