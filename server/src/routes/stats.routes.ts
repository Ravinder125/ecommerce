import { Router } from 'express'
import { Dashboard, getBarCharts, getLineCharts, getPieCharts } from '../controllers/stats.controller.js';
import { adminOnly, authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(authMiddleware)

router.route("/stats").get(adminOnly, Dashboard);
router.route("/pie").get(adminOnly, getPieCharts);
router.route("/bar").get(adminOnly, getBarCharts);
router.route("/line").get(adminOnly, getLineCharts);

export default router;   