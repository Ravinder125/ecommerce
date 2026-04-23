import mongoose from "mongoose";
import { UserRole } from "../../types/types.js";

export type Gender = "male" | "female";
export type ObjectId = mongoose.Types.ObjectId;

export type CreateUser = {
  name: string;
  email: string;
  avatar?: string;
  avatarId?: string;
  gender: Gender;
  role: UserRole;
  firebaseUID: string;
  dob: Date;
};

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  avatar?: string;
  avatarId?: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  firebaseUID: string;
  // Virtual Attribute
  age: number;
}

export interface RegisterUserRequestBody {
  name: string;
  email: string;
  avatar: string;
  gender: Gender;
  role: string;
  dob: Date;
}
