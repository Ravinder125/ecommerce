import { body } from "express-validator";

export const couponValidator = [
    body("code")
        .notEmpty().withMessage("Coupon code is required")
        .isString().withMessage("Coupon code must be a string"),
        
    body("amount")
        .isNumeric().withMessage("Coupon amount must be a number")
        .isLength({ min: 1 }).withMessage("Coupon amount cannot be zero")
] 