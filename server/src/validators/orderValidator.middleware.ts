// src/validators/orderValidator.ts
import { body } from "express-validator";

export const createOrderValidator = [
    body("buyer")
        .notEmpty().withMessage("Buyer ID is required"),

    body("orderItems.*.product")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Product ID must be a valid Mongo ID"),

    body("orderItems.*.name")
        .notEmpty().withMessage("Product name is required")
        .isString().withMessage("Product name must be a string"),

    body("orderItems.*.price")
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number"),

    body("orderItems.*.quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

    body("orderItems.*.image")
        .notEmpty().withMessage("Image URL is required")
        .isString().withMessage("Image must be a string"),

    body("shippingInfo.address")
        .notEmpty().withMessage("Shipping address is required"),

    body("shippingInfo.city")
        .notEmpty().withMessage("City is required"),

    body("shippingInfo.state")
        .notEmpty().withMessage("State is required"),

    body("shippingInfo.country")
        .notEmpty().withMessage("Country is required"),

    body("shippingInfo.pinCode")
        .notEmpty().withMessage("Postal code is required"),

    body("paymentInfo.id")
        .notEmpty().withMessage("Payment ID is required"),

    body("paymentInfo.status")
        .notEmpty().withMessage("Payment status is required"),

    body("taxPrice")
        .notEmpty().withMessage("Tax amount is required")
        .isNumeric().withMessage("Tax amount must be a number"),

    body("shippingCharge")
        .notEmpty().withMessage("Shipping amount is required")
        .isNumeric().withMessage("Shipping amount must be a number"),

    body("discount")
        .notEmpty().withMessage("Discount amount is required")
        .isNumeric().withMessage("Discount amount must be a number"),

    body("totalPrice")
        .notEmpty().withMessage("Total amount is required")
        .isNumeric().withMessage("Total amount must be a number"),
];
