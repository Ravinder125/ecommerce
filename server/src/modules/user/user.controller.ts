import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { userService } from "./user.service.js";
import { RegisterUserRequestBody } from "./user.types.js";

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, RegisterUserRequestBody>, res: Response) => {
    const firebaseUID = req.firebaseUser?.uid;

    const { name, email, gender, dob } = req.body;

    const user = await userService.registerUser({
      name,
      email,
      gender,
      role: "user",
      firebaseUID: firebaseUID!,
      dob: new Date(dob),
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, user, `User successfully created ${user.name}`),
      );
  },
);

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Successfully fetched users"));
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Successfully fetched user"));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  await userService.deleteUser(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User successfully deleted"));
});
