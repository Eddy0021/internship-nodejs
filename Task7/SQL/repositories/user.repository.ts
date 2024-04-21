import { UserEntity } from '../entities/user.entity';

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

export default {
    getUserById,
};
