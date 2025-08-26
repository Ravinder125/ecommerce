import { body } from "express-validator";

export const createOrder = [
    body("name")
        .notEmpty().withMessage("Product name is required")
        .isString().withMessage("Product name must be string ")
        .isLength({ max: 200 }).withMessage("Product name cannot exceed 120 characters")
    ,

    body("description")
        .notEmpty().withMessage("description is Required")
        .isString().withMessage("Product description must be a string "),

    body("price")
        .notEmpty().withMessage("Product price is required")
        .isNumeric().withMessage("Product price must be a number")
        .isLength({ max: 999999, min: 0 }).withMessage("Product price can neither exceed 6 digit nor be negative "),

    body("brand")
        .notEmpty().withMessage("Product brand is required")
        .isString().withMessage("Product brand must be a string "),
        
    body("category")
        .notEmpty().withMessage("Product category is required")
        .isString().withMessage("Product category must be string "),
        
    body("stock")
        .notEmpty().withMessage("Product stock is required")
        .isNumeric().withMessage("Product stock must be a number")
        .isLength({ max: 999999, min: 0 }).withMessage("Product stock can neither exceed 6 digit nor be negative"),

]