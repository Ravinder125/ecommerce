import { ApiError } from "../../utils/ApiError.js";
import { isValidId, toObjectId } from "../../utils/mongoUtils.js";
import { userRepository } from "./user.repository.js";
import { CreateUser, IUser } from "./user.types.js";

export interface IUserService {
  registerUser(data: CreateUser): Promise<IUser>;
  getAllUsers(): Promise<Partial<IUser>[]>;
  deleteUser(id: string): Promise<void>;
}

export const userService: IUserService = {
  async registerUser(data) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) throw new ApiError(409, "User already exist");
    return userRepository.createUser(data);
  },

  async getAllUsers() {
    const users = await userRepository.findAll();
    if (!users?.length) {
      throw new ApiError(400, "No User found");
    }

    return users;
  },

  async deleteUser(id) {
    if (!id) throw new ApiError(400, "ID is required");

    if (!isValidId(id)) {
      throw new ApiError(400, "Invalid Mongo DB Id");
    }

    const mongooseId = toObjectId(id);

    const deleted = await userRepository.deleteById(mongooseId);
    if (!deleted) throw new ApiError(404, "No user found");
  },
};
