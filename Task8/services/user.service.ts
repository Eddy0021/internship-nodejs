// user.service.ts
import bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { UserEntity } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

import dotenv from "dotenv";

dotenv.config();

export const signup = async (email: string, password: string, role: "admin" | "user"): Promise<void> => {
  // Check if user already exists
  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists.');
  }

  // Create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserEntity(email, hashedPassword, role);
  await UserRepository.createUser(newUser);
};

export const signin = async (email: string, password: string): Promise<string> => {
  // Check if user exists
  const user = await UserRepository.findByEmail(email);
  if (!user) {
    throw new Error('User dosen`t exists.');
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials.');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.TOKEN_KEY!, { expiresIn: '2h' });
  return token;
};

export default {
  signup,
  signin,
};
