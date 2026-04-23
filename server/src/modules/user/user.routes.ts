import Router from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  registerUser,
} from "./user.controller.js";
import {
  adminOnly,
  protect,
  syncUser,
} from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validateRequest.middleware.js";
import { createUser } from "./user.validation.js";
// import { auth } from "../middlewares/clerkAuth.middlewares.js";

const router = Router();

// Routes
router.route("/sync-profile").post(
  // upload.single("avatar"),
  protect,
  createUser,
  validateRequest,
  registerUser,
);

// router.route("/login").post()

router.route("/profile").get(protect, syncUser, getUser);

router.route("/all").get(protect, syncUser, adminOnly, getAllUsers);
router
  .route("/:id")
  .get(protect, syncUser, getUser)
  .delete(protect, syncUser, deleteUser);

export default router;
