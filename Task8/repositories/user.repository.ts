import { UserEntity } from '../entities/user.entity';

const { v4: uuidv4 } = require('uuid');

import {DI} from '../index'

// Repository functions
const getUserById = async (userId: string): Promise<UserEntity | undefined> => {
    try {
        const user = await DI.userRepository.findOne({ id: userId });
        if (!user) {
            return undefined;
        }
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

export const createUser = async (user: UserEntity): Promise<void> => {
    try {
      user.id = uuidv4();
      await DI.em.persistAndFlush(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
  
  export const findByEmail = async (email: string): Promise<UserEntity | null> => {
    try {
      const user = await DI.userRepository.findOne({ email });
      return user ?? null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  };

export default {
    getUserById,
    createUser,
    findByEmail,
};
