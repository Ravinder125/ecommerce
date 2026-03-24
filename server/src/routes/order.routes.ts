import { Router } from "express";
import { adminOrders, createOrder, getMyOrders, getSingleOrder, processOrder } from "../controllers/order.controller.js";
import { createOrderValidator } from "../validators/orderValidator.middleware.js";
import { adminOnly, protect, syncUser } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";

const router = Router();

router
    .route("/")
    .post(protect, syncUser, createOrderValidator, validateRequest, createOrder,)
    .get(protect, syncUser, getMyOrders)

router
    .route("/admin")
    .get(protect, syncUser, adminOnly, adminOrders)

router
    .route("/:id")
    .get(protect, syncUser, getSingleOrder)
    .put(protect, syncUser, processOrder)

export default router;