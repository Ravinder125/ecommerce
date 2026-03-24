import { Request, Response } from "express";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RegisterUserRequestBody } from "../types/types.js";
import { ApiError } from "../utils/ApiError.js";


export const registerUser = asyncHandler(
    async (
        req: Request<{}, {}, RegisterUserRequestBody>,
        res: Response
    ) => {

        const firebaseUID = req.firebaseUser?.uid
        console.log(firebaseUID)
        const { name, email, gender, role, dob } = req.body;
        const isUserExists = await User.findOne({ email })
        if (isUserExists) throw new ApiError(400, "User already exists")

        const user = await User.create({
            name,
            email,
            avatar: null,
            // avatarId: public_id,
            gender,
            role,
            firebaseUID,
            dob: new Date(dob)
        });

        return res
            .status(201)
            .json(new ApiResponse(
                201,
                user,
                `User successfully created ${user.name}`)
            )
    })

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({}).select("name email gender avatar");
    return res.status(200).json(
        new ApiResponse(200, users, "Successfully fetched users")
    )
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user
    return res.
        status(200)
        .json(
            new ApiResponse(200, user, "Successfully fetched user")
        )
})

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id })
    if (!user) throw new ApiError(400, "No user found");
    return res.status(200).json(
        new ApiResponse(200, null, "User successfully deleted")
    )
})