import { Request, Response } from "express";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RegisterUserRequestBody } from "../types/types.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getAuth, } from "@clerk/express";


export const registerUser = asyncHandler(
    async (
        req: Request<{}, {}, RegisterUserRequestBody>,
        res: Response
    ) => {
        console.log("it's working")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessages = errors.array().map(e => e.msg)
            throw new ApiError(400, "Validation Error", errMessages)
        }

        const { userId } = getAuth(req)

        const { name, email, gender, role, dob } = req.body;
        const isUserExists = await User.findById(userId)
        if (isUserExists) throw new ApiError(400, "User already exists")
        // const localFilePath = req.file?.path;


        // if (!localFilePath) throw new ApiError(400, "Avatar is required");
        // const uploadImage = await uploadOnCloudinary(localFilePath);
        // if (!uploadImage) throw new ApiError(500, "Error while uploading image on Cloudinary")
        // const { public_id, url } = uploadImage;

        const user = await User.create({
            name,
            email,
            // avatar: url,
            // avatarId: public_id,
            gender,
            role,
            _id: userId,
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
    const users = await User.find({});
    return res.status(200).json(
        new ApiResponse(200, users, "Successfully fetched users")
    )
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = ((req as any).auth).userId
    const user = await User.findById(userId)
        .select("-updatedAt -createdAt -__v")
        .lean()

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