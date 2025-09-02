import { NextFunction, Request, Response, RequestHandler } from "express";

export const asyncHandler = (
    fn: RequestHandler
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.resolve(fn(req, res, next));
        } catch (err: unknown) {
            if (err instanceof Error) {
                const statusCode = (err as any).statusCode || 500;
                const errors = (err as any).errors || undefined;

                let message = err.message;

                // Handle common mongoose errors
                if ((err as any).name === "CastError") {
                    message = "Invalid ID format";
                }
                if ((err as any).name === "ValidationError") {
                    message = "Validation failed";
                }

                res.status(statusCode).json({
                    success: false,
                    message,
                    errors,
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                });
            }
        }
    };
};
