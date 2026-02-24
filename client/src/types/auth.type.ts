// export type UserRoleType = "admin" | "user"
// export type GenderType = "male" | "female"

import type { UserRole, Genders } from "./user.type"

export interface AuthFormData {
    email: string,
    password: string,
}

export interface UserProfile {
    name: string
    email: string
    password: string
    role: UserRole
    dob: string
    avatar: string | ArrayBuffer | null
    gender: Genders
}

// export type CompleteFormData = Omit<
//     UserProfile,
//     "password"
//     | "email"
//     | "role"
//     | "gender"
//     | "avatar"> & {
//         gender: Genders | "",
//         role: UserRole | "",
//         avatar: string | undefined
//     }