import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { createOrderValidator } from "../middlewares/validators/orderValidator.middleware.js";

const router = Router();

router.route("/").post(
    createOrderValidator,
    createOrder,
)

export default router;