import Router from "express"
import {
    getAllUsers,
    registerUser,
    getUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { adminOnly, authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createUser } from "../validators/userValidator.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
// import { auth } from "../middlewares/clerkAuth.middlewares.js";

const router = Router();

// Routes
router.route("/sync-profile").post(
    // upload.single("avatar"),
    createUser,
    validateRequest,
    registerUser,
)

// router.route("/login").post()

router.route("/profile").get(getUser)

router.route("/all").get(authMiddleware,adminOnly, getAllUsers)
router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)


export default router;