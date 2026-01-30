import { Request, Response } from "express";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RegisterUserRequestBody } from "../types/types.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import clerkClient from "@clerk/clerk-sdk-node";


export const registerUser = asyncHandler(
    async (
        req: Request<{}, {}, RegisterUserRequestBody>,
        res: Response
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessages = errors.array().map(e => e.msg)
            throw new ApiError(400, "Validation Error", errMessages)
        }

        const { name, email, gender, role, _id, dob } = req.body;
        const isUserExists = await User.findById(_id)
        if (isUserExists) throw new ApiError(400, "User already exists")

        const localFilePath = req.file?.path;
        if (!localFilePath) throw new ApiError(400, "Avatar is required");
        const uploadImage = await uploadOnCloudinary(localFilePath);
        if (!uploadImage) throw new ApiError(500, "Error while uploading image on Cloudinary")
        const { public_id, url } = uploadImage;

        const user = await User.create({
            name,
            email,
            avatar: url,
            avatarId: public_id,
            gender,
            role,
            _id,
            dob: new Date(dob)
        });
        return res
            .status(201)
            .json(
                new ApiResponse(201, user, `User successfully created ${user.age}`))
    })

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({});
    return res.status(200).json(
        new ApiResponse(200, users, "Successfully fetched users")
    )
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    // const { id } = req.params;
    // const user = await User.findById(id);
    // if (!user) throw new ApiError(400, "No user Found")
    // return res.status(200).json(
    //     new ApiResponse(200, user, "User fetched successfully")
    // )
    // const userId = (req as any).userId
    // console.log(userId)
    const userId = ((req as any).auth).userId
    const user = await clerkClient.users.getUser(userId)

    const data = {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        role: user.unsafeMetadata.role,
        dob: user.unsafeMetadata.dob,
        avatar: user.unsafeMetadata.avatar,
    }

    res.json(data)
})

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id })
    if (!user) throw new ApiError(400, "No user found");
    return res.status(200).json(
        new ApiResponse(200, null, "User successfully deleted")
    )
})