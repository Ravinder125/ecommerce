import { Router } from "express";
import {
  Dashboard,
  getBarCharts,
  getLineCharts,
  getPieCharts,
} from "./dashboard.controller.js";
import {
  adminOnly,
  protect,
  syncUser,
} from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/stats").get(protect, syncUser, adminOnly, Dashboard);
router.route("/pie").get(protect, syncUser, adminOnly, getPieCharts);
router.route("/bar").get(protect, syncUser, adminOnly, getBarCharts);
router.route("/line").get(protect, syncUser, adminOnly, getLineCharts);

export default router;
