import { body } from "express-validator";

export const createUser = [
    body("_id")
        .notEmpty().withMessage("ID is required")
        .isString().withMessage("ID must be a string"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string"),

    body("gender").isIn(["male", "female"]).withMessage("Gender is required"),

    body("dob")
        .notEmpty().withMessage("Date of birth is required")
        .isString().withMessage("Date of birth must be string"),
] 