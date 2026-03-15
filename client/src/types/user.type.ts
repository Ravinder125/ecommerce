import type { GENDERS, USER_ROLE } from "../utils/data";
import type { UserPayload } from "../validations/completeProfileSchema";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  gender: Genders,
  // createdAt: string;
}
export type CompleteFormData = Omit<UserPayload, "email" | "gender" | "avatar"> & {
  gender: string;
  avatar: File | null
}

export type AuthState = {
  user: User | null;
  isLoading: boolean;
}

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]
export type Genders = typeof GENDERS[keyof typeof GENDERS]