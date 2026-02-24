import { Router } from 'express';
import {
    allCoupons,
    applyDiscount,
    deleteCoupon,
    newCoupon,
    updateCoupon
} from '../controllers/payment.controller.js';
import { couponValidator } from '../middlewares/validators/paymentValidator.middleware.js';
import { adminOnly, authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(authMiddleware)

router.route("/coupon")
    .get(adminOnly, allCoupons)
    .post(adminOnly, couponValidator, newCoupon)

router.route("/coupon/:id")
    .delete(adminOnly, deleteCoupon)
    .patch(adminOnly, updateCoupon)

router.route("/discount").post(applyDiscount)

export default router;