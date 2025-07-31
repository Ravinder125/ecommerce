import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, avatar, gender, role, _id, dob } = req.body;
    const user = await User.create({
        name,
        email,
        avatar,
        gender,
        role,
        _id,
        dob
    });
    console.log(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, null, `User successfully created ${user.age}`));
});
