import { body, param } from "express-validator";

export const createProductSchema = [
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

export const updateProductSchema = [
    param("id")
        .notEmpty().withMessage("ID is required")
        .isString().withMessage("ID must be a string"),
    body("name")
        .isString().withMessage("Product name must be string ")
        .isLength({ max: 200 }).withMessage("Product name cannot exceed 120 characters")
        .optional()
    ,

    body("description")
        .isString().withMessage("Product description must be a string ")
        .optional(),

    body("price")
        .isNumeric().withMessage("Product price must be a number")
        .isLength({ max: 999999, min: 0 }).withMessage("Product price can neither exceed 6 digit nor be negative "),

    body("brand")
        .isString().withMessage("Product brand must be a string ")
        .optional(),

    body("category")
        .isString().withMessage("Product category must be string ")
        .optional(),

    body("stock")
        .isNumeric().withMessage("Product stock must be a number")
        .isLength({ max: 999999, min: 0 }).withMessage("Product stock can neither exceed 6 digit nor be negative")
        .optional(),

]