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

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.query;
    const orders = await Order.find({ buyer: userId }).lean()
    if (!orders) throw new ApiError(401, "No order Found")

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders successfully fetched")
    )
})

export const adminOrders = asyncHandler(async (req: Request, res: Response) => {

    const userId = req?.user?._id


    const orders = await Order.aggregate([
        // Step 1: break orders into individual items
        { $unwind: "$orderItem" },

        // Step 2: join each orderItem.product with Product collection
        {
            $lookup: {
                from: "products",
                localField: "orderItem.product",
                foreignField: "_id",
                as: "productDoc"
            }
        },

        // Step 3: flatten productDoc array
        { $unwind: "$productDoc" },

        // Step 4: filter only items owned by this admin
        {
            $match: {
                "productDoc.owner": userId // 🔑
            }
        },

        // Step 5: rebuild order with only the filtered items
        {
            $group: {
                _id: "$_id",
                buyer: { $first: "$buyer" },
                shippingInfo: { $first: "$shippingInfo" },
                paymentMethod: { $first: "$paymentMethod" },
                paymentInfo: { $first: "$paymentInfo" },
                subtotal: { $first: "$subtotal" },
                discount: { $first: "$discount" },
                taxPrice: { $first: "$taxPrice" },
                shippingCharge: { $first: "$shippingCharge" },
                totalPrice: { $first: "$totalPrice" },
                orderStatus: { $first: "$orderStatus" },
                deliveredAt: { $first: "$deliveredAt" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                quantity: { $sum: "$orderItem.quantity" },

                // Collect only the matching order items
                orderItem: { $push: "$orderItem" }
            }
        }
    ]);


    console.log(orders)
    if (!orders) throw new ApiError(401, "No order Found")

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders successfully fetched")
    )
})


export const getSingleOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) throw new ApiError(404, "Order not found")
    return res.status(200).json(
        new ApiResponse(200, order, "Order successfully fetched")
    )
})

export const processOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    const isCancelled = req.query?.isCancelled;

    if (!order) throw new ApiError(404, "No order found")

    if (
        isCancelled && order.orderStatus === "Processing" ||
        isCancelled && order.orderStatus === "Shipped"
    ) {
        order.orderStatus = "Cancelled"
    } else if (isCancelled && order.orderStatus === "Delivered") {
        throw new ApiError(400, "Order cannot be canceled after delivery")
    } else {
        switch (order.orderStatus) {
            case "Processing":
                order.orderStatus = "Shipped"
                break;
            case "Shipped":
                order.orderStatus = "Delivered"
                break;
            case "Cancelled":
                return res.status(200).json(
                    new ApiResponse(200, null, "Order already cancelled")
                )
            default:
                return res.status(200).json(
                    new ApiResponse(200, null, "Order already delivered")
                )
        }
    }


    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, "Order processed successfully")
    )
})