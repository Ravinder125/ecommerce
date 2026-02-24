import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { RegisterUserRequestBody } from "../types/types.js";
import { getAuth } from "@clerk/express";

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
        const user = req.user
        if (!user) {
            throw new ApiError(400, "User is missing")
        }

        if (user.role !== "admin") throw new ApiError(401, "Admin only")

        next()
    })

export const authMiddleware = asyncHandler(
    async (req: Request, _: Response, next: NextFunction) => {
        const { userId } = getAuth(req);
        if (!userId) throw new ApiError(401, "Unauthorized Error");

        const user = await User
            .findById(userId)
            .select("-updatedAt -createdAt -_v");

        if (!user) throw new ApiError(401, "Unauthorized Error");

        req.user = user;
        next()
    }
)