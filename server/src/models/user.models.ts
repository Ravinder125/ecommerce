import mongoose from "mongoose";
import validator from 'validator'


interface IUser extends Document {
    _id: string;
    name: string;
    avatar: string;
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


UserSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear()
    if (today.getMonth() < dob.getMonth() || (
        today.getMonth() === today.getDate() &&
        today.getMonth() < dob.getDate())) {
        return age--
    }
    return age;
})


export const User = mongoose.model<IUser>("User", UserSchema)
