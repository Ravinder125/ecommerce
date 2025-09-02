import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Coupon, ICoupon } from "../models/coupon.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";


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
    const id = req?.user?._id

    const coupons = await Coupon.findOne({})
    if (!coupons) throw new ApiError(400, "Invalid coupon code")

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





