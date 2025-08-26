import { Router } from "express"
import { body } from "express-validator";
import {
    getAllUsers,
    registerUser,
    getUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createUser } from "../middlewares/validators/userValidator.middleware.js";

const router = Router();

// Routes

router.route("/register").post(
    upload.single("avatar"),
    createUser,
    registerUser,
)
router.route("/all").get(adminOnly, getAllUsers)
router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)


export default router;