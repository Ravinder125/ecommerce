import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NewOrderRequestBody } from "../types/types.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.models.js";
import { reduceStock } from "../utils/features.js";


export const createOrder = asyncHandler(
    async (
        req: Request<{}, {}, NewOrderRequestBody>,
        res: Response
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(e => e.msg);
            throw new ApiError(400, "Validation Error", errorMessages);
        }

        const {
            buyer,
            discount,
            orderItem,
            paymentMethod,
            shippingCharge,
            shippingInfo,
            subtotal,
            taxPrice,
            totalPrice,
            orderStatus,
            paymentInfo } = req.body

        const order = await Order.create({
            buyer,
            discount,
            orderItem,
            paymentMethod,
            shippingCharge,
            shippingInfo,
            subtotal,
            taxPrice,
            totalPrice,
            orderStatus,
            paymentInfo
        })

        await reduceStock(orderItem)

        return res.status(201).json(
            new ApiResponse(200, order, "Order placed successfully ")
        )
    })