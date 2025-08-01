export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            if (error instanceof Error) {
                // Use type assertions to access custom properties, or provide fallbacks
                const statusCode = error.statusCode || 500;
                const errors = error.errors || undefined;
                res.status(statusCode).json({
                    success: false,
                    message: error.message,
                    errors: errors
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: "An error occurred",
                });
            }
        }
    };
};
