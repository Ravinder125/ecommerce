import type { AuthFormData } from "../types/auth.type";
import type { ShippingInfo } from "../types/transaction.type";
import type { CompleteFormData } from "../types/user.type";
import type { NewProductFormData } from "../validations/productDataSchema";

// Auth Starts

export const InitialCompleteFormData: CompleteFormData = {
    name: "",
    role: "user",
    dob: "",
    avatar: null,
    gender: "",
}

export const InitialProductFormData: NewProductFormData = {
    name: "",
    price: 0,
    description: "",
    stock: 0,
    images: [],
    category: "",
    brand: ""
}

export const InitialAuthUpData: AuthFormData = {
    email: "",
    password: ""
}

export const InitialShippingInfoData: ShippingInfo = {
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    pinCode: 0
}