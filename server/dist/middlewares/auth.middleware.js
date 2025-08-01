import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
export const adminOnly = asyncHandler(async (req, _, next) => {
    const { id } = req.query;
    if (!id)
        throw new ApiError(401, "Unauthorized Error");
    const user = await User.findById(id);
    if (!user)
        throw new ApiError(401, "Unauthorized Error");
    if (user.role !== "admin")
        throw new ApiError(401, "Admin only");
    req.user = user;
    next();
});
