import { User } from "./user.model.js";
import { CreateUser, IUser, ObjectId } from "./user.types.js";

interface IUserRepository {
  findByEmail: (email: string) => Promise<IUser | null>;
  createUser: (userData: CreateUser) => Promise<IUser>;
  findById: (id: ObjectId) => Promise<IUser | null>;
  findAll: () => Promise<IUser[]>;
  deleteById: (id: ObjectId) => Promise<boolean>;
}

export const userRepository: IUserRepository = {
  async findByEmail(email) {
    return User.findOne({ email }).exec();
  },

  async createUser(data) {
    return User.create(data);
  },

  async findById(id) {
    return User.findById(id).exec();
  },

  async findAll() {
    return User.find({}).select("name email gender avatar").lean().exec();
  },

  async deleteById(id) {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount === 1;
  },
};
