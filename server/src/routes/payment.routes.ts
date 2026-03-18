import { Router } from 'express';
import {
    allCoupons,
    applyDiscount,
    createPaymentIntent,
    deleteCoupon,
    newCoupon,
    updateCoupon
} from '../controllers/payment.controller.js';
import { adminOnly } from '../middlewares/auth.middleware.js';
import { couponValidator } from '../validators/paymentValidator.middleware.js';

const router = Router();

router.route("/create").post(createPaymentIntent)
router.route("/webhook")
router.route("/refund")

router.route("/coupon")
    .get(adminOnly, allCoupons)
    .post(adminOnly, couponValidator, newCoupon)

router.route("/coupon/:id")
    .delete(adminOnly, deleteCoupon)
    .patch(adminOnly, updateCoupon)

router.route("/discount").post(applyDiscount)

export default router;