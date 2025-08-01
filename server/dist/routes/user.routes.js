import { Router } from "express";
import { body } from "express-validator";
import { getAllUsers, registerUser, getUser, deleteUser, } from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
// Routes
router.route("/register").post(upload.single("avatar"), [
    body("_id").notEmpty().isString().withMessage("_id is required"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    body("name").notEmpty().isString().withMessage("Name is required"),
    body("gender").isIn(["male", "female"]).withMessage("Gender is required"),
    body("dob")
        .notEmpty().withMessage("Date of birth is required")
        .isString().withMessage("Date of birth must be string"),
], registerUser);
router.route("/all").get(adminOnly, getAllUsers);
router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser);
export default router;
