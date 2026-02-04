import Router from "express"
import {
    getAllUsers,
    registerUser,
    getUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createUser } from "../middlewares/validators/userValidator.middleware.js";
// import { auth } from "../middlewares/clerkAuth.middlewares.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();

// Routes




router.route("/register").post(
    // upload.single("avatar"),
    createUser,
    registerUser,
)

// router.route("/login").post()

router.route("/profile").get(getUser)

router.route("/all").get(adminOnly, getAllUsers)
router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)


export default router;