import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Coupon, ICoupon } from "../models/coupon.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { IOrderItem, IShippingInfo } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { stripe } from "../app.js";


export const createPaymentIntent = asyncHandler(async (req, res) => {

    const userId = req.user?._id

    const user = await User.findById(userId).select("name");

    if (!user) {
        throw new ApiError(401, "Please login first");
    }

    const { coupon, items, shippingInfo } = req.body as {
        items: IOrderItem[],
        shippingInfo: IShippingInfo | undefined;
        coupon: string | undefined;
    };

    if (!items) throw new ApiError(400, "Items are required");

    if (!shippingInfo) throw new ApiError(400, "Shipping Info is required");

    let discountAmount = 0;

    if (coupon) {
        const discount = await Coupon.findOne({ code: coupon });
        if (!discount) throw new ApiError(400, "Invalid Coupon Code")
        discountAmount = discount.amount;
    }

    const productIDs = items.map(item => item.productId);

    const products = await Product.find({
        _id: { $in: productIDs }
    });

    const subtotal = products.reduce((prev, curr) => {
        const item = items.find((i) => i.productId === curr._id)
        if (!item) return prev;
        return curr.price * item.quantity + Number(prev)
    }, 0);

    const tax = subtotal * 0.18;

    const shippingCharge = subtotal > 1000 ? 0 : 200;

    const total = Math.floor(subtotal + tax + shippingCharge - discountAmount);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "inr",
        description: "MERN-ECOMMERCE",
        shipping: {
            name: user.name,
            address: {
                line1: shippingInfo.address,
                postal_code: shippingInfo.pinCode.toString(),
                city: shippingInfo.city,
                state: shippingInfo.state,
                country: shippingInfo.country,
            },
        },
    })

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            { clientSecret: paymentIntent.client_secret })
        )
})

export const newCoupon = asyncHandler(async (
    req: Request<{}, {}, ICoupon>,
    res: Response
) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(e => e.msg);
        throw new ApiError(400, "Validation Error", errorMessages);
    }
    const { code, amount } = req.body;
    const coupon = await Coupon.create({ code, amount })
    return res.status(200).json(
        new ApiResponse(201, coupon, "Coupon successfully created")
    )
})

export const applyDiscount = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) throw new ApiError(400, "Coupon code is required")
    const coupon = await Coupon.findOne({ code })

    if (!coupon) throw new ApiError(400, "Invalid coupon code")

    return res.status(200).json(
        new ApiResponse(201, { discount: coupon.amount }, "Coupon applied successfully ")
    )
})

export const allCoupons = asyncHandler(async (req: Request, res: Response) => {
    // const id = req.query?._id

    const coupons = await Coupon.find({})

    if (!coupons?.length) throw new ApiError(400, "No coupon found ")

    return res.status(200).json(
        new ApiResponse(201, coupons, "Coupon applied successfully ")
    )
})

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const coupon = await Coupon.findByIdAndDelete(id)

    if (!coupon) throw new ApiError(400, "No coupon found")

    return res.status(200).json(
        new ApiResponse(201, null, "Coupon deleted successfully")
    )
})

export const updateCoupon = asyncHandler(async (
    req: Request<{}, {}, ICoupon>,
    res: Response
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(e => e.msg);
        throw new ApiError(400, "Validation Error", errorMessages);
    }

    const { id } = req.params as { id: string }
    const { code, amount } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
        id,
        { code, amount },
        { new: true, runValidators: true }
    );

    if (!coupon) {
        throw new ApiError(404, "Coupon not found");
    }

    return res.status(200).json(
        new ApiResponse(200, coupon, "Coupon successfully updated")
    );
});