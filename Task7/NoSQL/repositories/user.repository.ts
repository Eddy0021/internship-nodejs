import UserModel from '../models/user.model';
import { UserEntity } from "../entities/user.entity";

// Get a user by ID from the database
const getUserById = async (userId: string): Promise<UserEntity | null> => {
  return UserModel.findById(userId).exec();
};

export default {
  getUserById,
};
