import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { NewOrderRequestBody } from "../types/types.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.models.js";
import { reduceStock } from "../utils/features.js";
import mongoose, { isValidObjectId, ObjectId } from "mongoose";

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

        const buyer = req.user?._id;

        const {
            discount,
            orderItems,
            paymentMethod,
            shippingCharges,
            shippingInfo,
            subtotal,
            paymentInfo,
            tax,
            total,
        } = req.body

        const order = await Order.create({
            buyer,
            discount,
            orderItems,
            paymentMethod,
            paymentInfo,
            shippingCharges,
            shippingInfo,
            subtotal,
            tax,
            total,
        })

        await reduceStock(orderItems)

        return res.status(201).json(
            new ApiResponse(200, order, "Order placed successfully ")
        )
    })

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id
    const orders = await Order.aggregate([
        { $match: { buyer: userId } },
        {
            $project: {
                _id: "$_id",
                quantity: { $sum: "$orderItems.quantity" },
                total: "$total",
                discount: "$discount",
                orderStatus: "$orderStatus"
            }
        }
    ])
    if (!orders) throw new ApiError(401, "No order Found")

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders successfully fetched")
    )
})

export const adminOrders = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?._id
    const orders = await Order.aggregate([
        // Step 1: unwind items
        { $unwind: "$orderItems" },

        // Step 2: lookup product for each item
        {
            $lookup: {
                from: "products",
                localField: "orderItems.productId",
                foreignField: "_id",
                as: "productDoc"
            }
        },

        // Step 3: flatten productDoc
        { $unwind: "$productDoc" },

        // Step 4: filter only items whose product is owned by this admin
        {
            $match: {
                "productDoc.owner": userId
            }
        },

        // Step 5: regroup
        {
            $group: {
                _id: "$_id",
                buyer: { $first: "$buyer" },
                shippingInfo: { $first: "$shippingInfo" },
                paymentMethod: { $first: "$paymentMethod" },
                paymentInfo: { $first: "$paymentInfo" },
                subtotal: { $first: "$subtotal" },
                discount: { $first: "$discount" },
                tax: { $first: "$tax" },
                shippingCharges: { $first: "$shippingCharges" },
                total: { $first: "$total" },
                orderStatus: { $first: "$orderStatus" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                orderItems: { $push: "$orderItems" },
                quantity: { $sum: "$orderItems.quantity" }
            }
        },

        // Step 6: sort by most recent
        { $sort: { createdAt: -1 } }
    ])
    if (!orders) throw new ApiError(401, "No order Found")
    return res.status(200).json(
        new ApiResponse(200, orders, "Orders successfully fetched")
    )
})


export const getSingleOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "products",
                localField: "orderItems.productId",
                foreignField: "_id",
                as: "products"
            }
        },
        {
            $addFields: {
                "orderItems": {
                    $map: {
                        input: "$orderItems",
                        as: "item",
                        in: {
                            $mergeObjects: [
                                "$$item",
                                {
                                    image: {
                                        $let: {
                                            vars: {
                                                matchedProduct: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$products",
                                                                as: "p",
                                                                cond: { $eq: ["$$p._id", "$$item.productId"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: { $arrayElemAt: ["$$matchedProduct.images.image", 0] }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                products: 0  // remove the products array, keeping everything else
            }
        }
    ])
    if (!order) throw new ApiError(404, "Order not found")
    return res.status(200).json(
        new ApiResponse(200, order[0], "Order successfully fetched")
    )
})

export const processOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params;
    const order = await Order.findById(id);

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID")
    }
    const isCancelled = req.query?.isCancelled === "true";

    if (!order) throw new ApiError(404, "No order found")

    if (
        (isCancelled && order.orderStatus === "Processing") ||
        (isCancelled && order.orderStatus === "Shipped")
    ) {
        order.orderStatus = "Cancelled";
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