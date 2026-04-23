import { body } from "express-validator";

export const createUser = [

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

    body("name").notEmpty().withMessage("Name is required"),

    body("gender").isIn(["male", "female"]).withMessage("Gender is required"),

    body("dob")
        .notEmpty().withMessage("Date of birth is required")
        .isString().withMessage("Date of birth must be string"),
] 