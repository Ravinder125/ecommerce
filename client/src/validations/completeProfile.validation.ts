import { z } from "zod";
import type { Genders, UserRole } from "../types/user.type";
import { GENDERS, USER_ROLE } from "../utils/data";

export const completeFormDataSchema = z.object({
    email: z.string().email("Invalid email address"),

    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name is too long"),

    role: z.enum(
        Object.values(USER_ROLE) as [UserRole, ...UserRole[]],
        { message: "Invalid user role" }
    ),

    gender: z.enum(
        Object.values(GENDERS) as [Genders, ...Genders[]],
        { message: "Invalid gender" }
    ),

    dob: z.string().refine(
        (val) => !Number.isNaN(Date.parse(val)),
        "Invalid date of birth"
    ),

    avatar: z.string().nullable(),
});

export type UserPayload = z.infer<typeof completeFormDataSchema>; 