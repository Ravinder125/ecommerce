import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "./user.types.js";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firebaseUID: {
      type: String,
      required: [true, "ID is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      validator: validator.default.isEmail,
    },
    avatar: {
      type: String,
      // required: [true, "Avatar is required"]
      trim: true,
    },
    avatarId: {
      type: String,
      trim: true,
      // required: [true, "Avatar public ID is required"]
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
  },
  { timestamps: true },
);

UserSchema.virtual("age").get(function () {
  if (!this.dob) return null; // Handle missing dob

  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  // Check if the birthday hasn't occurred this year
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age -= 1;
  }

  return age;
});

UserSchema.index({ name: 1 });
UserSchema.index({ firebaseUID: 1 });

export const User = mongoose.model("User", UserSchema);
