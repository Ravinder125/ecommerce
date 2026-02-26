import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validateRequest = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(e => e.msg);
        throw new ApiError(400, "Validation Error", errorMessages);
    }

    next()
})