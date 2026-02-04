import type { GENDERS, USER_ROLE } from "../utils/data";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  gender: Genders,
  // createdAt: string;
}
export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]
export type Genders = typeof GENDERS[keyof typeof GENDERS]