import mongoose from "mongoose";
import validator from 'validator'


export interface IUser extends Document {
    _id: string;
    name: string;
    avatar: string;
    avatarId: string;
    email: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    // Virtual Attribute
    age: number;

}

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "ID is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
        validator: validator.default.isEmail,
    },
    avatar: {
        type: String,
        required: [true, "Avatar is required"]
    },
    avatarId: {
        type: String,
        required: [true, "Avatar public ID is required"]
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
        required: [true, "Date of birth is required"]
    }
},
    { timestamps: true }
)

// Allowing db queries to include virtual properies
// UserSchema.set("toObject", { virtuals: true })

UserSchema.virtual("age").get(function () {
    if (!this.dob) return null; // Handle missing dob

    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    // Check if the birthday hasn't occurred this year
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age -= 1;
    }

    return age;
});

export const User = mongoose.model<IUser>("User", UserSchema)
