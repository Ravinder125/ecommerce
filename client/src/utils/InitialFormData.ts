import type { AuthFormData } from "../types/auth.type";
import type { NewProductFormData } from "../types/product.type";

// Auth Starts

export const InitialCompleteFormData: CompleteFormData = {
    fullName: "",
    role: "",
    dob: "",
    avatar: "",
    gender: "",
}

export const InitialProductFormData: NewProductFormData = {
    name: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
    category: "",
    brand: ""
}


export const InitialAuthUpData: AuthFormData = {
    email: "",
    password: ""
}