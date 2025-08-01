import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
export const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMessages = errors.array().map(e => e.msg);
        throw new ApiError(400, "Validation Error", errMessages);
    }
    const { name, email, avatar, gender, role, _id, dob } = req.body;
    const isUserExists = await User.findById(_id);
    if (isUserExists)
        throw new ApiError(400, "User already exists");
    const user = await User.create({
        name,
        email,
        avatar,
        gender,
        role,
        _id,
        dob: new Date(dob)
    });
    return res
        .status(201)
        .json(new ApiResponse(201, user, `User successfully created ${user.age}`));
});
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    console.log(users);
    return res.status(200).json(new ApiResponse(200, users, "Successfully fetched users"));
});
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
        throw new ApiError(400, "No user Found");
    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id });
    if (!user)
        throw new ApiError(400, "No user found");
    return res.status(200).json(new ApiResponse(200, null, "User successfully deleted"));
});
