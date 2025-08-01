import { Router } from "express"
import { body } from "express-validator";
import {
    getAllUsers,
    registerUser,
    getUser,
    deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

// Routes

router.route("/register").post(
    [
        body("_id").notEmpty().isString().withMessage("Name is required"),
        body("email")
            .notEmpty().withMessage("Name is required")
            .isEmail().withMessage("Invalid email"),
        body("name").notEmpty().isString().withMessage("Name is required"),
        body("gender").isIn(["male", "female"]).withMessage("Gender is required"),
        body("dob")
            .notEmpty().withMessage("Date of birth is required")
            .isDate().withMessage("Date of birth must be a date"),
    ],
    registerUser,
)
router.route("/all").get(getAllUsers)
router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)


export default router;