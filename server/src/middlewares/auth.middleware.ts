import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../modules/user/user.model.js";
import admin from "../config/firebaseAdmin.js";

export const adminOnly = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(400, "User ID is missing");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(400, "Unauthorized Error");
    }

    if (user.role !== "admin") throw new ApiError(403, "Unauthorized Error");

    next();
  },
);

// export const authMiddleware = asyncHandler(
//     async (req: Request, _: Response, next: NextFunction) => {
//         const userId = req.body._id
//         if (!userId) throw new ApiError(401, "Unauthorized Error");

//         const user = await User
//             .findById(userId)
//             .select("-updatedAt -createdAt -_v");

//         if (!user) throw new ApiError(401, "Unauthorized Error");

//         req.user = user;
//         next()
//     }
// )

export const protect = asyncHandler(async (req, _, next) => {
  const header = req.headers.authorization;

  if (!header) throw new ApiError(401, "Unauthorized");
  const token = header.split(" ")[1];
  const decoded = await admin.auth().verifyIdToken(token);

  req.firebaseUser = decoded;
  next();
});

export const syncUser = asyncHandler(async (req, res, next) => {
  const firebaseUID = req.firebaseUser?.uid;
  let user = await User.findOne({ firebaseUID });
  // if (!user) {
  //     user = await User.create({
  //         firebaseUID,
  //         email: req.firebaseUser?.email,

  //         role: "user",
  //     })
  // }

  if (!user) {
    throw new ApiError(401, "No User found");
  }

  req.user = {
    _id: user._id,
    avatar: user.avatar,
    dob: user.dob,
    email: user.email,
    gender: user.gender,
    name: user.name,
    role: user.role,
  };
  next();
});
