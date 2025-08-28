import { Router } from "express";
import { adminOrders, createOrder, getMyOrders, getSingleOrder, processOrder } from "../controllers/order.controller.js";
import { createOrderValidator } from "../middlewares/validators/orderValidator.middleware.js";
import { adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router
    .route("/")
    .post(createOrderValidator, createOrder,)
    .get(getMyOrders)

router
    .route("/admin")
    .get(adminOnly, adminOrders)

router
    .route("/:id")
    .get(getSingleOrder)
    .put(processOrder)

export default router;