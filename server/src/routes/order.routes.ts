import { Router } from "express";
import { adminOrders, createOrder, getMyOrders, getSingleOrder, processOrder } from "../controllers/order.controller.js";
import { createOrderValidator } from "../validators/orderValidator.middleware.js";
import { adminOnly, authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";

const router = Router();

router.use(authMiddleware)

router
    .route("/")
    .post(createOrderValidator, validateRequest, createOrder,)
    .get(getMyOrders)

router
    .route("/admin")
    .get(adminOnly, adminOrders)

router
    .route("/:id")
    .get(getSingleOrder)
    .put(processOrder)

export default router;