import { UserEntity } from "../entities/user.entity";

const users: UserEntity [] = [
  {
      id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
      email: "admin@gmail.com",
      password: "123",
      role: "admin"
  },
  {
    id: "ce815710-72c1-4748-99a6-752806e1f2a9",
    email: "admin2@gmail.com",
    password: "123",
    role: "user"
},
]
  
// Repository functions
const getUserById = async (userId: string):  Promise<UserEntity> => {
  const user = users.find(user => user.id === userId);
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }
  return user;
};
  
  
export default {
  getUserById,
};