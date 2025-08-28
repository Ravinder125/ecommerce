import { NextFunction, Request, Response } from "express"


export const asyncHandler = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction)
        : Promise<void | Response<any, Record<string, any>>> => {
        try {
            await fn(req, res, next);
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Use type assertions to access custom properties, or provide fallbacks
                const statusCode = (error as any).statusCode || 500;
                const errors = (error as any).errors || undefined;

                if (error.name === "CastError") error = "Invalid ID"
                
                res.status(statusCode).json({
                    success: false,
                    message: error,
                    errors: errors
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An error occurred",
                });
            }
        }
    }
}