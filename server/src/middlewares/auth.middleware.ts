import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { RegisterUserRequestBody } from "../types/types.js";

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: RegisterUserRequestBody;
        }
}
}

export const adminOnly = asyncHandler(
    async (req: Request, _: Response, next: NextFunction) => {
        const { id } = req.query;
        if (!id) throw new ApiError(401, "Unauthorized Error");
        const user = await User.findById(id);
        if (!user) throw new ApiError(401, "Unauthorized Error");
        if (user.role !== "admin") throw new ApiError(401, "Admin only")
        req.user = user;
        next()
    })