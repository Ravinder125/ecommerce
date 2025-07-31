import { NextFunction, Request, Response } from "express"
import { ApiError } from "./ApiError.js";


export const asyncHandler = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: "An error occurred",
                })
            }
        }
    }
}