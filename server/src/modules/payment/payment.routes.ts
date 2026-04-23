import { Router } from "express";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
  updateCoupon,
} from "./payment.controller.js";
import {
  adminOnly,
  protect,
  syncUser,
} from "../../middlewares/auth.middleware.js";
import { couponValidator } from "../../validators/paymentValidator.middleware.js";

const router = Router();

router.route("/create").post(protect, syncUser, createPaymentIntent);
router.route("/webhook");
router.route("/refund");

router
  .route("/coupon")
  .get(protect, syncUser, adminOnly, allCoupons)
  .post(protect, syncUser, adminOnly, couponValidator, newCoupon);

router
  .route("/coupon/:id")
  .delete(protect, syncUser, adminOnly, deleteCoupon)
  .patch(protect, syncUser, adminOnly, updateCoupon);

router.route("/discount").post(protect, syncUser, applyDiscount);

export default router;
