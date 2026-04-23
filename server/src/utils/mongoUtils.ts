import mongoose from "mongoose";
import { ObjectId } from "../modules/user/user.types.js";

export const isValidId = (id: string): boolean | null => {
  if (!id) return null;

  return mongoose.isValidObjectId(id);
};

export const toObjectId = (id: string): ObjectId => {
  return new mongoose.Types.ObjectId(id);
};
